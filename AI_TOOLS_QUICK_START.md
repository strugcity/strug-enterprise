# AI Tools Quick Start Guide

Quick reference for all AI tools working on the Strug City project.

---

## 🤖 **Available AI Tools**

| Tool | Where | Use For | How to Invoke |
|------|-------|---------|---------------|
| **Claude Code** (Me!) | VS Code | Architecture, QA, complex tasks | You're using it now! |
| **GitHub Copilot** | VS Code | Code completion, components | Automatic suggestions |
| **Gemini** | GitHub | PR reviews, issue triage | `@gemini-cli /review` |
| **Roo Cline** | VS Code | Chat-based coding with Gemini | Sidebar panel |

---

## 📍 **Where to Use Each Tool**

### **Claude Code** - Your Main Agent
- ✅ Multi-file refactors
- ✅ Architecture decisions
- ✅ Git operations
- ✅ QA and PR reviews
- ✅ Documentation
- ✅ Complex debugging

**How to use**: You're already using it! Just ask me anything.

---

### **GitHub Copilot** - Your Code Pair Programmer
- ✅ Auto-completing code as you type
- ✅ Generating functions from comments
- ✅ Writing tests
- ✅ Suggesting next lines

**How to use**:
- Start typing, accept suggestions with `Tab`
- Comment what you want: `// Create a function that...`
- Press `Ctrl+Enter` for Copilot panel

**VS Code shortcuts**:
- `Tab` - Accept suggestion
- `Alt+]` - Next suggestion
- `Alt+[` - Previous suggestion
- `Ctrl+Enter` - Open Copilot panel

---

### **Gemini (GitHub)** - Your PR Reviewer
- ✅ Automated PR reviews when bots create PRs
- ✅ Issue triage and labeling
- ✅ Custom commands on issues

**How to use**:
```bash
# On any issue or PR, comment:
@gemini-cli /review              # Review this PR
@gemini-cli /triage              # Triage this issue
@gemini-cli [your question]      # Custom command
```

**Examples**:
```
@gemini-cli Can you suggest improvements to this code?
@gemini-cli Please review the security implications of this change
@gemini-cli What tests should I add for this feature?
```

**Files it reads**:
- `GEMINI.md` - Project context
- Your code changes in the PR/issue

---

### **Roo Cline (VS Code)** - Your Gemini Chat Partner
- ✅ Chat-based coding with Gemini
- ✅ Explain code
- ✅ Generate components
- ✅ Refactor code

**How to use**:
1. Click Roo Cline icon in sidebar
2. Type your request in chat
3. It can read/write files in your workspace

**Setup needed**: See `GEMINI_VSCODE_SETUP.md`

**Example prompts**:
```
Can you create a new blog component?
Explain how this function works
Refactor this to use TypeScript
Add error handling to this API call
```

---

## 🎯 **Decision Tree: Which Tool to Use?**

### **Need to...**

#### Write code faster as you type?
→ **GitHub Copilot** (automatic)

#### Have a conversation about code in VS Code?
→ **Roo Cline** (Gemini chat) or **Claude Code** (me!)

#### Get a PR reviewed automatically?
→ **Gemini** (GitHub, automatic for bot PRs)

#### Review code yourself before merging?
→ **Claude Code** (me!) - I give detailed PR reviews

#### Plan architecture or big refactors?
→ **Claude Code** (me!) - I can see the whole codebase

#### Triage and label issues?
→ **Gemini** (GitHub) - `@gemini-cli /triage`

#### Generate documentation?
→ **Claude Code** (me!) or **Roo Cline**

#### Debug complex issues?
→ **Claude Code** (me!) - I can run commands and search

---

## ⚡ **Quick Commands**

### **Claude Code** (VS Code)
```bash
# I'm always available in this chat window!
# Just type your request and I'll help
```

### **GitHub Copilot** (VS Code)
```
Tab                    # Accept suggestion
Ctrl+Enter             # Open Copilot panel
Alt+] / Alt+[          # Cycle suggestions
```

### **Gemini** (GitHub)
```bash
@gemini-cli /review    # Review PR
@gemini-cli /triage    # Triage issue
@gemini-cli [prompt]   # Custom command
```

### **Roo Cline** (VS Code)
```
Click sidebar icon     # Open chat
Ctrl+Shift+P           # "Roo Cline: ..." commands
```

---

## 🔧 **Setup Status**

| Tool | Status | Action Needed |
|------|--------|---------------|
| Claude Code | ✅ Active | None - you're using it! |
| GitHub Copilot | ✅ Installed | None - working |
| Gemini (GitHub) | ✅ Configured | None - ready to use |
| Roo Cline | ✅ Installed | Need to configure (see GEMINI_VSCODE_SETUP.md) |

---

## 📚 **Documentation**

- **Claude Code**: Built-in help in this chat
- **GitHub Copilot**: https://docs.github.com/copilot
- **Gemini**: See `GEMINI.md` for project context
- **Roo Cline**: See `GEMINI_VSCODE_SETUP.md` for setup

---

## 💡 **Tips**

1. **Use the right tool for the job**: Don't overthink it, just use what's convenient
2. **Combine tools**: Copilot for typing, Claude Code for planning, Gemini for reviews
3. **Provide context**: The more specific you are, the better results you'll get
4. **Iterate**: If the AI doesn't get it right, clarify and try again

---

## 🎮 **Try These Now**

### Test GitHub Copilot (in any .tsx file):
```typescript
// Create a button component that shows loading state
```
Press Enter and watch Copilot suggest code!

### Test Gemini (on GitHub):
1. Go to any issue: https://github.com/strugcity/strug-enterprise/issues
2. Comment: `@gemini-cli Tell me about this project`

### Test Roo Cline (in VS Code):
1. Click Roo Cline icon in sidebar
2. Type: "Hello! Can you help me with this project?"

### Test Claude Code (here!):
Just ask me anything! Try: "Can you show me the current project structure?"

---

**Happy coding!** 🚀
