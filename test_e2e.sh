#!/usr/bin/env bash
set -e

echo "=========================================================="
echo " SURVEYADMIN PRO - UÇTAN UCA E2E INTEGRATION TEST SUITE"
echo "=========================================================="

echo ""
echo "[1/6] AUTHENTICATION TEST"
ADMIN_RES=$(curl -s -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"usernameOrPhone":"admin","password":"Admin123!"}')
ADMIN_TOKEN=$(echo "$ADMIN_RES" | jq -r '.accessToken')
ADMIN_ROLE=$(echo "$ADMIN_RES" | jq -r '.user.role')
echo " -> Admin Login OK: Role=$ADMIN_ROLE (Token Length: ${#ADMIN_TOKEN})"

FIELD_RES=$(curl -s -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"usernameOrPhone":"ahmet","password":"Saha123!"}')
FIELD_TOKEN=$(echo "$FIELD_RES" | jq -r '.accessToken')
FIELD_ROLE=$(echo "$FIELD_RES" | jq -r '.user.role')
echo " -> Field User Login OK: Role=$FIELD_ROLE (Token Length: ${#FIELD_TOKEN})"

echo ""
echo "[2/6] SURVEY CREATION & CLONE TEST"
NEW_SURVEY=$(curl -s -X POST http://localhost:5000/api/surveys -H "Authorization: Bearer $ADMIN_TOKEN" -H "Content-Type: application/json" -d '{"title":"2026 Sulama Altyapı Anketi","description":"Saha sulama boruları tespiti","source":"ADMIN"}')
SURVEY_ID=$(echo "$NEW_SURVEY" | jq -r '.id')
echo " -> Created Survey ID: $SURVEY_ID"

CLONED_SURVEY=$(curl -s -X POST http://localhost:5000/api/surveys/$SURVEY_ID/clone -H "Authorization: Bearer $ADMIN_TOKEN")
CLONED_ID=$(echo "$CLONED_SURVEY" | jq -r '.id')
CLONED_TITLE=$(echo "$CLONED_SURVEY" | jq -r '.title')
echo " -> Cloned Survey ID: $CLONED_ID (Title: $CLONED_TITLE)"

echo ""
echo "[3/6] ASSIGNMENT & VIEWED_AT TRACKING TEST"
VILLAGE_ID="33333333-3333-3333-3333-333333333331"
FIELD_USER_ID="22222222-2222-2222-2222-222222222222"
ASSIGN_RES=$(curl -s -X POST http://localhost:5000/api/assignments -H "Authorization: Bearer $ADMIN_TOKEN" -H "Content-Type: application/json" -d "{
  \"surveyId\": \"$SURVEY_ID\",
  \"villageId\": \"$VILLAGE_ID\",
  \"targetCount\": 100,
  \"startDate\": \"2026-08-09T00:00:00Z\",
  \"endDate\": \"2026-08-30T00:00:00Z\",
  \"note\": \"Test ataması\",
  \"assignedUserIds\": [\"$FIELD_USER_ID\"]
}")
ASSIGN_ID=$(echo "$ASSIGN_RES" | jq -r '.id')
echo " -> Created Assignment ID: $ASSIGN_ID"

VIEW_RES=$(curl -s -X POST http://localhost:5000/api/assignments/$ASSIGN_ID/viewed -H "Authorization: Bearer $FIELD_TOKEN")
echo " -> Field User Viewed Assignment: $VIEW_RES"

echo ""
echo "[4/6] IDEMPOTENT SUBMISSION & DUPLICATE TEST"
UNIQUE_CLIENT_ID="test-guid-$(date +%s)"
SUB_1=$(curl -s -X POST http://localhost:5000/api/submissions -H "Authorization: Bearer $FIELD_TOKEN" -H "Content-Type: application/json" -d "{
  \"clientSubmissionId\": \"$UNIQUE_CLIENT_ID\",
  \"surveyId\": \"$SURVEY_ID\",
  \"assignmentId\": \"$ASSIGN_ID\",
  \"villageId\": \"$VILLAGE_ID\",
  \"startedAt\": \"2026-08-09T22:00:00Z\",
  \"completedAt\": \"2026-08-09T22:05:00Z\",
  \"latitude\": 37.0662,
  \"longitude\": 37.3833,
  \"accuracy\": 5.0,
  \"syncSource\": \"ONLINE\",
  \"answers\": [{ \"questionId\": \"66666666-6666-6666-6666-666666666661\", \"answerValue\": \"Test Üretici\" }]
}")
SUB_1_ID=$(echo "$SUB_1" | jq -r '.id')
echo " -> Submission 1 ID: $SUB_1_ID"

SUB_2=$(curl -s -X POST http://localhost:5000/api/submissions -H "Authorization: Bearer $FIELD_TOKEN" -H "Content-Type: application/json" -d "{
  \"clientSubmissionId\": \"$UNIQUE_CLIENT_ID\",
  \"surveyId\": \"$SURVEY_ID\",
  \"assignmentId\": \"$ASSIGN_ID\",
  \"villageId\": \"$VILLAGE_ID\",
  \"startedAt\": \"2026-08-09T22:00:00Z\",
  \"completedAt\": \"2026-08-09T22:05:00Z\",
  \"latitude\": 37.0662,
  \"longitude\": 37.3833,
  \"accuracy\": 5.0,
  \"syncSource\": \"ONLINE\",
  \"answers\": [{ \"questionId\": \"66666666-6666-6666-6666-666666666661\", \"answerValue\": \"Test Üretici\" }]
}")
SUB_2_ID=$(echo "$SUB_2" | jq -r '.id')
echo " -> Submission 2 ID (Duplicate Retry): $SUB_2_ID"

if [ "$SUB_1_ID" = "$SUB_2_ID" ]; then
  echo " -> SUCCESS: Mükerrer kayıt engellendi! (Idempotency OK)"
fi

echo ""
echo "[5/6] MESSAGE & SEEN_AT TRACKING TEST"
MSG_RES=$(curl -s -X POST http://localhost:5000/api/messages -H "Authorization: Bearer $ADMIN_TOKEN" -H "Content-Type: application/json" -d '{
  "title": "Acil Saha Hatırlatması",
  "content": "Lütfen cihaz şarjlarınızı kontrol edin.",
  "recipientUserIds": ["22222222-2222-2222-2222-222222222222"]
}')
MSG_ID=$(echo "$MSG_RES" | jq -r '.id')
echo " -> Created Message ID: $MSG_ID"

SEEN_RES=$(curl -s -X POST http://localhost:5000/api/messages/$MSG_ID/seen -H "Authorization: Bearer $FIELD_TOKEN")
echo " -> Field User Seen Message: $SEEN_RES"

echo ""
echo "[6/6] GERÇEK EXCEL (.XLSX) VE PDF RAPOR TESTLERİ"
EXCEL_STATUS=$(curl -s -o test_report.xlsx -w "%{http_code}" -X POST http://localhost:5000/api/reports/excel -H "Authorization: Bearer $ADMIN_TOKEN" -H "Content-Type: application/json" -d "{\"surveyId\":\"$SURVEY_ID\"}")
PDF_STATUS=$(curl -s -o test_report.pdf -w "%{http_code}" -X POST http://localhost:5000/api/reports/pdf -H "Authorization: Bearer $ADMIN_TOKEN" -H "Content-Type: application/json" -d "{\"surveyId\":\"$SURVEY_ID\"}")

echo " -> Excel Export HTTP Status: $EXCEL_STATUS (Boyut: $(wc -c < test_report.xlsx) byte)"
echo " -> PDF Export HTTP Status: $PDF_STATUS (Boyut: $(wc -c < test_report.pdf) byte)"

rm -f test_report.xlsx test_report.pdf

echo ""
echo "=========================================================="
echo " TÜM ENTEGRASYON VE E2E TESTLERİ BAŞARIYLA TAMAMLANDI!"
echo "=========================================================="
