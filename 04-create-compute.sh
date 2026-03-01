#!/bin/bash
# ============================================================
# STEP 4: Compute Engine Instance
# Creates the VM that will host the Node.js API + React frontend
# ============================================================

set -e

INSTANCE_NAME="bookstore-server"
ZONE="us-central1-a"
NETWORK_NAME="bookstore-vpc"

echo "═══════════════════════════════════════════"
echo "  Step 4: Compute Engine VM Setup"
echo "═══════════════════════════════════════════"

# ─── Create the GCE instance ───
echo "→ Creating VM: $INSTANCE_NAME"
gcloud compute instances create $INSTANCE_NAME \
  --zone=$ZONE \
  --machine-type=e2-medium \
  --image-family=ubuntu-2204-lts \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=20GB \
  --boot-disk-type=pd-standard \
  --network=$NETWORK_NAME \
  --tags=http-server,ssh-server \
  --scopes=cloud-platform \
  --metadata=startup-script='#!/bin/bash
    # Auto-install essentials on first boot
    apt-get update
    apt-get install -y curl git nginx

    # Install Node.js 20
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs

    # Install PM2 globally
    npm install -g pm2

    echo "✓ Startup script complete"
  '

# ─── Wait for VM to be ready ───
echo "→ Waiting for VM to be ready..."
sleep 10

# ─── Get the external IP ───
EXTERNAL_IP=$(gcloud compute instances describe $INSTANCE_NAME \
  --zone=$ZONE \
  --format="value(networkInterfaces[0].accessConfigs[0].natIP)")

echo ""
echo "═══════════════════════════════════════════"
echo "  ✓ Compute Engine VM created!"
echo "═══════════════════════════════════════════"
echo ""
echo "  Instance:    $INSTANCE_NAME"
echo "  Zone:        $ZONE"
echo "  Type:        e2-medium (2 vCPU, 4GB RAM)"
echo "  OS:          Ubuntu 22.04 LTS"
echo "  External IP: $EXTERNAL_IP"
echo ""
echo "  SSH into the VM:"
echo "    gcloud compute ssh $INSTANCE_NAME --zone=$ZONE"
echo ""
echo "  After SSH, the startup script installs:"
echo "    Node.js 20, Nginx, PM2, Git"
echo ""
echo "Next: Run 05-deploy-app.sh"
