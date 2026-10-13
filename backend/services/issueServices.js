
const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

// Step 2: Locate the data file
const DATA_FILE = path.join(__dirname, '..', 'data', 'issues.json');

// Step 3: Read all issues
async function readIssues() {
    try {
        const text = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(text);
    } catch (error) {
        if (error.code === 'ENOENT') return [];
        throw error;
    }
}

// Step 4: Save all issues
async function writeIssues(issues) {
    await fs.writeFile(
        DATA_FILE,
        JSON.stringify(issues, null, 2)
    );
}

// Step 5: Create an issue
async function createIssue(input) {
    const issues = await readIssues();

    const issue = {
        id: randomUUID(),
        title: input.title.trim(),
        description: input.description.trim(),
        priority: input.priority,
        status: 'Open',
        createdAt: new Date().toISOString()
    };

    issues.push(issue);

    await writeIssues(issues);

    return issue;
}

// Step 6: Change the status of an issue
async function updateIssueStatus(id, status) {
    const issues = await readIssues();

    const issue = issues.find((item) => item.id === id);

    if (!issue) return null;

    issue.status = status;

    await writeIssues(issues);

    return issue;
}

// Step 7: Export the functions
module.exports = {
    readIssues,
    createIssue,
    updateIssueStatus
};
