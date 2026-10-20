import { strict as assert } from 'node:assert';
import { randomUUID } from 'node:crypto';

const API = process.env.API_URL || 'http://127.0.0.1:5001/api';
const ROOT = API.replace(/\/api\/?$/, '');

async function request(path, { token, expected = 200, ...options } = {}) {
  const headers = { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${path.startsWith('/health') ? ROOT : API}${path}`, { ...options, headers });
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.arrayBuffer();
  assert.equal(response.status, expected, `${options.method || 'GET'} ${path}: ${response.status} ${JSON.stringify(data)}`);
  return { response, data };
}

const health = (await request('/health')).data;
assert.equal(health.status, 'healthy');
assert.equal(health.database.connected, true);
assert.equal(health.database.persistent, true);
assert.match(health.database.provider, /Npgsql/);

const admin = (await request('/auth/login', {
  method: 'POST',
  body: JSON.stringify({ usernameOrPhone: 'admin', password: 'Admin123!' })
})).data;
assert.equal(admin.user.role, 'ADMIN');

const field = (await request('/auth/login', {
  method: 'POST',
  body: JSON.stringify({ usernameOrPhone: 'saha', password: 'Saha123!' })
})).data;
assert.equal(field.user.role, 'FIELD_USER');

await request('/personnel', { token: field.accessToken, expected: 403 });
await request('/assignments', { token: field.accessToken, expected: 403 });
await request('/reports/summary', {
  token: field.accessToken,
  expected: 403,
  method: 'POST',
  body: JSON.stringify({})
});

const suffix = new Date().toISOString();
const survey = (await request('/surveys', {
  token: admin.accessToken,
  method: 'POST',
  body: JSON.stringify({
    title: `E2E Kalıcılık Testi ${suffix}`,
    description: 'İzole PostgreSQL uçtan uca doğrulama kaydı',
    source: 'ADMIN'
  })
})).data;
assert.equal(survey.status, 'DRAFT');

const question = (await request(`/surveys/${survey.id}/questions`, {
  token: admin.accessToken,
  method: 'POST',
  body: JSON.stringify({
    sectionId: null,
    title: 'Test cevabınız nedir?',
    description: 'E2E doğrulama sorusu',
    type: 'TEXT',
    isRequired: true,
    order: 1,
    conditionSourceQuestionId: null,
    conditionOperator: null,
    conditionValue: null,
    options: null
  })
})).data;
assert.equal(question.title, 'Test cevabınız nedir?');

const activeSurvey = (await request(`/surveys/${survey.id}/status`, {
  token: admin.accessToken,
  method: 'PUT',
  body: JSON.stringify({ status: 'ACTIVE' })
})).data;
assert.equal(activeSurvey.status, 'ACTIVE');

const assignment = (await request('/assignments', {
  token: admin.accessToken,
  method: 'POST',
  body: JSON.stringify({
    surveyId: survey.id,
    villageId: '33333333-3333-3333-3333-333333333331',
    targetCount: 1,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 86_400_000).toISOString(),
    note: 'E2E PostgreSQL doğrulaması',
    assignedUserIds: [field.user.id]
  })
})).data;
assert.equal(assignment.surveyId, survey.id);

const myTasks = (await request('/assignments/my-tasks', { token: field.accessToken })).data;
assert(myTasks.some(item => item.id === assignment.id));

const fieldSurveys = (await request('/surveys', { token: field.accessToken })).data;
const assignedSurvey = fieldSurveys.find(item => item.id === survey.id);
assert(assignedSurvey);
assert(assignedSurvey.questions.some(item => item.id === question.id));

const viewed = (await request(`/assignments/${assignment.id}/viewed`, {
  token: field.accessToken,
  method: 'POST'
})).data;
assert.equal(viewed.success, true);

const clientSubmissionId = randomUUID();
const submissionPayload = {
  clientSubmissionId,
  surveyId: survey.id,
  assignmentId: assignment.id,
  villageId: '33333333-3333-3333-3333-333333333331',
  startedAt: new Date(Date.now() - 60_000).toISOString(),
  completedAt: new Date().toISOString(),
  latitude: 37.0662,
  longitude: 37.3833,
  accuracy: 5,
  syncSource: 'ONLINE',
  answers: [{ questionId: question.id, answerValue: 'Başarılı', fileBase64: null, fileName: null }]
};

const submission = (await request('/submissions', {
  token: field.accessToken,
  method: 'POST',
  body: JSON.stringify(submissionPayload)
})).data;
const duplicate = (await request('/submissions', {
  token: field.accessToken,
  method: 'POST',
  body: JSON.stringify(submissionPayload)
})).data;
assert.equal(duplicate.id, submission.id);

const submissions = (await request(`/submissions?surveyId=${survey.id}`, { token: admin.accessToken })).data;
assert(submissions.some(item => item.id === submission.id));

const summary = (await request('/reports/summary', {
  token: admin.accessToken,
  method: 'POST',
  body: JSON.stringify({ surveyId: survey.id })
})).data;
assert.equal(summary.surveyId, survey.id);
assert.equal(summary.totalValidSubmissions, 1);

const excel = await request('/reports/excel', {
  token: admin.accessToken,
  method: 'POST',
  body: JSON.stringify({ surveyId: survey.id })
});
assert(excel.data.byteLength > 1000);

const pdf = await request('/reports/pdf', {
  token: admin.accessToken,
  method: 'POST',
  body: JSON.stringify({ surveyId: survey.id })
});
assert(pdf.data.byteLength > 1000);

const message = (await request('/messages', {
  token: admin.accessToken,
  method: 'POST',
  body: JSON.stringify({
    title: `E2E Mesaj ${suffix}`,
    content: 'PostgreSQL mesaj akışı doğrulaması',
    recipientUserIds: [field.user.id]
  })
})).data;
const myMessages = (await request('/messages/my-messages', { token: field.accessToken })).data;
assert(myMessages.some(item => item.id === message.id));
const seen = (await request(`/messages/${message.id}/seen`, {
  token: field.accessToken,
  method: 'POST'
})).data;
assert.equal(seen.success, true);

console.log(JSON.stringify({
  ok: true,
  provider: health.database.provider,
  surveyId: survey.id,
  assignmentId: assignment.id,
  submissionId: submission.id,
  messageId: message.id,
  checks: 22
}));
