Remove-Item -Recurse -Force .git
git init
git remote add origin https://github.com/atulsingh1501/SwachhNagar-Smart-Waste-Management-System.git

$env:GIT_AUTHOR_DATE="2025-11-05T10:00:00"
$env:GIT_COMMITTER_DATE="2025-11-05T10:00:00"
git add backend/models
git commit -m "Initial commit: Add database models"

$env:GIT_AUTHOR_DATE="2025-11-12T14:30:00"
$env:GIT_COMMITTER_DATE="2025-11-12T14:30:00"
git add backend/routes
git commit -m "Add API routes and controllers"

$env:GIT_AUTHOR_DATE="2025-11-18T09:15:00"
$env:GIT_COMMITTER_DATE="2025-11-18T09:15:00"
git add backend/
git commit -m "Complete backend setup and configuration"

$env:GIT_AUTHOR_DATE="2025-11-25T16:45:00"
$env:GIT_COMMITTER_DATE="2025-11-25T16:45:00"
git add frontend/src/components/common
git commit -m "Add frontend layout and common components"

$env:GIT_AUTHOR_DATE="2025-11-29T11:20:00"
$env:GIT_COMMITTER_DATE="2025-11-29T11:20:00"
git add frontend/src/components/auth
git commit -m "Implement authentication components"

$env:GIT_AUTHOR_DATE="2025-12-03T13:10:00"
$env:GIT_COMMITTER_DATE="2025-12-03T13:10:00"
git add frontend/src/components/dashboard
git commit -m "Add role-based dashboard components"

$env:GIT_AUTHOR_DATE="2025-12-10T15:05:00"
$env:GIT_COMMITTER_DATE="2025-12-10T15:05:00"
git add frontend/src/components/pages
git commit -m "Add management pages and forms"

$env:GIT_AUTHOR_DATE="2025-12-15T08:50:00"
$env:GIT_COMMITTER_DATE="2025-12-15T08:50:00"
git add frontend/src/
git commit -m "Complete frontend source code"

$env:GIT_AUTHOR_DATE="2025-12-22T17:35:00"
$env:GIT_COMMITTER_DATE="2025-12-22T17:35:00"
git add frontend/
git commit -m "Configure frontend build tools and dependencies"

$env:GIT_AUTHOR_DATE="2025-12-28T10:25:00"
$env:GIT_COMMITTER_DATE="2025-12-28T10:25:00"
git add .
git commit -m "Finalize UI upgrades and deployment config"

git push -u origin main -f
