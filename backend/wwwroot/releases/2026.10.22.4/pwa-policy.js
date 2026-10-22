// Shared survey URLs are forms, not entry points for installing the management app.
export function isSharedSurveyPage(search = '') {
  return new URLSearchParams(search).has('survey');
}
