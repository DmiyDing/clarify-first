const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '../package.json');
const skillMdPath = path.join(__dirname, '../clarify-first/SKILL.md');
const changelogPath = path.join(__dirname, '../CHANGELOG.md');

// 1. Get version from package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const pkgVersion = packageJson.version;
console.log(`package.json version: ${pkgVersion}`);

// 2. Get version from skill.md (frontmatter)
const skillMdContent = fs.readFileSync(skillMdPath, 'utf8');
const skillVersionMatch = skillMdContent.match(/version:\s*([0-9.]+)/);
if (!skillVersionMatch) {
  console.error('Error: Could not find version in clarify-first/SKILL.md frontmatter');
  process.exit(1);
}
const skillVersion = skillVersionMatch[1];
console.log(`skill.md version:     ${skillVersion}`);

// 3. Get version from CHANGELOG.md (first H2)
const changelogContent = fs.readFileSync(changelogPath, 'utf8');
const changelogMatch = changelogContent.match(/## \[([0-9.]+)\]/);
if (!changelogMatch) {
  console.error('Error: Could not find latest version in CHANGELOG.md');
  process.exit(1);
}
const changelogVersion = changelogMatch[1];
console.log(`CHANGELOG.md version: ${changelogVersion}`);

// Compare
if (pkgVersion !== skillVersion || pkgVersion !== changelogVersion) {
  console.error('\n❌ Version mismatch detected!');
  process.exit(1);
}

console.log('\n✅ All versions match.');
process.exit(0);