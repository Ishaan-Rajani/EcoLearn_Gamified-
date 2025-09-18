const fs = require('fs');
const path = require('path');

// Files to update
const files = [
  'src/pages/student/Challenges.tsx',
  'src/pages/student/Leaderboard.tsx',
  'src/pages/student/Rewards.tsx',
  'src/pages/teacher/Dashboard.tsx'
];

// Translation mappings
const translations = {
  'Navigation': '{t(\'navigation\')}',
  'Dashboard': '{t(\'dashboard\')}',
  'Lessons': '{t(\'lessons\')}',
  'Challenges': '{t(\'challenges\')}',
  'Leaderboard': '{t(\'leaderboard\')}',
  'Rewards': '{t(\'rewards\')}',
  'Teacher Navigation': '{t(\'teacherNavigation\')}',
  'Teacher Dashboard': '{t(\'dashboard\')}',
  'View Lessons': '{t(\'viewLessons\')}',
  'Manage Challenges': '{t(\'manageChallenges\')}',
  'Student Leaderboard': '{t(\'studentLeaderboard\')}',
  'Student Rewards': '{t(\'studentRewards\')}',
  'Manage Students': '{t(\'manageStudents\')}',
  'Home': '{t(\'home\')}'
};

// Update each file
files.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Apply translations
    Object.entries(translations).forEach(([original, translation]) => {
      const regex = new RegExp(`"${original}"`, 'g');
      content = content.replace(regex, translation);
    });
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

console.log('Translation updates complete!');
