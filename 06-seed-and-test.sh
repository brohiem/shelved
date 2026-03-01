#!/bin/bash
# ============================================================
# STEP 6: Test the Deployed Bookstore
# Verifies the full stack is working end-to-end
# ============================================================

INSTANCE_NAME="bookstore-server"
ZONE="us-central1-a"

EXTERNAL_IP=$(gcloud compute instances describe $INSTANCE_NAME \
  --zone=$ZONE \
  --format="value(networkInterfaces[0].accessConfigs[0].natIP)")

BASE="http://$EXTERNAL_IP/api"

echo "═══════════════════════════════════════════"
echo "  Step 6: Testing Bookstore API"
echo "  Base URL: $BASE"
echo "═══════════════════════════════════════════"
echo ""

# ─── Health check ───
echo "1. Health check..."
curl -s "$BASE/health" | python3 -m json.tool
echo ""

# ─── List books ───
echo "2. List all books..."
curl -s "$BASE/books" | python3 -m json.tool
echo ""

# ─── Search books ───
echo "3. Search for 'Dune'..."
curl -s "$BASE/books?search=Dune" | python3 -m json.tool
echo ""

# ─── Filter by category ───
echo "4. Filter by category 'Technology'..."
curl -s "$BASE/books?category=Technology" | python3 -m json.tool
echo ""

# ─── Register a user ───
echo "5. Register test user..."
curl -s -X POST "$BASE/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@demo.com","name":"Test User","password":"password123"}' \
  | python3 -m json.tool
echo ""

# ─── Login ───
echo "6. Login..."
TOKEN=$(curl -s -X POST "$BASE/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@demo.com","password":"password123"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")
echo "  Token: ${TOKEN:0:30}..."
echo ""

# ─── Place an order ───
echo "7. Place an order (2 books)..."
curl -s -X POST "$BASE/orders" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"items":[{"book_id":1,"quantity":1},{"book_id":2,"quantity":2}]}' \
  | python3 -m json.tool
echo ""

# ─── View orders ───
echo "8. View orders..."
curl -s "$BASE/orders" \
  -H "Authorization: Bearer $TOKEN" \
  | python3 -m json.tool
echo ""

echo "═══════════════════════════════════════════"
echo "  ✓ All tests complete!"
echo "═══════════════════════════════════════════"
echo ""
echo "  Your bookstore is live at: http://$EXTERNAL_IP"
echo ""
