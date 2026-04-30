#!/usr/bin/env node

/**
 * Greeting Generator — Squad Intake
 * Generates contextual greeting for intake-chief activation
 *
 * Usage: node squads/squad-intake/scripts/generate-squad-greeting.js squad-intake intake-chief
 */

const fs = require('fs');
const path = require('path');

const SQUAD_NAME = 'squad-intake';
const SQUAD_PATH = path.join(__dirname, '..');

function countFiles(dir, ext) {
  try {
    const fullPath = path.join(SQUAD_PATH, dir);
    if (!fs.existsSync(fullPath)) return 0;
    return fs.readdirSync(fullPath).filter(f => f.endsWith(ext)).length;
  } catch {
    return 0;
  }
}

function getAgentNames() {
  try {
    const agentsDir = path.join(SQUAD_PATH, 'agents');
    if (!fs.existsSync(agentsDir)) return [];
    return fs.readdirSync(agentsDir)
      .filter(f => f.endsWith('.md'))
      .map(f => f.replace('.md', ''));
  } catch {
    return [];
  }
}

function generateGreeting() {
  const agents = getAgentNames();
  const taskCount = countFiles('tasks', '.md');
  const workflowCount = countFiles('workflows', '.yaml');
  const templateCount = countFiles('templates', '.md');

  const mindClones = agents.filter(a => a !== 'intake-chief');

  const greeting = `
\u{1F4CB} **Iris** | Client Intake Orchestrator | squad-intake v1.0.0

> "Diagnose before prescribing. Listen before asking. Understand before building."

**Squad Status:**
- ${agents.length} agents (1 orchestrator + ${mindClones.length} mind clones)
- ${taskCount} tasks | ${workflowCount} workflow | ${templateCount} templates

**Elite Minds:**
${mindClones.map(m => `- ${m}`).join('\n')}

**Quick Start:**
- \`*new-intake {cliente}\` — Fluxo completo (7 fases)
- \`*quick-intake {cliente}\` — So briefing
- \`*prepare-meeting {cliente}\` — Roteiro de reuniao
- \`*help\` — Todos os comandos

Qual cliente vamos fazer intake?
`.trim();

  console.log(greeting);
}

generateGreeting();
