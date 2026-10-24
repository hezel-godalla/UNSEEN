const $ = (selector) => document.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('unseen-theme', theme);

  const themeButton = $('#theme');
  if (themeButton) {
    themeButton.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
    themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
};

const savedTheme = localStorage.getItem('unseen-theme') || 'light';
document.documentElement.dataset.theme = savedTheme;
document.addEventListener('DOMContentLoaded', () => setTheme(savedTheme));

const themeButton = $('#theme');
if (themeButton) {
  themeButton.addEventListener('click', () => {
    const nextTheme =
      document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });
}

const menuButton = $('#menu');
if (menuButton) {
  menuButton.addEventListener('click', () => {
    const opened = $('#side')?.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(Boolean(opened)));
    menuButton.setAttribute('aria-label', opened ? 'Close navigation' : 'Open navigation');
  });
}

const quotes = [
  ['The work you do not see still matters.', 'UNSEEN'],
  ['Care is work, even when no one sends an invoice.', 'Community reflection'],
  ['Fairness begins when invisible tasks become visible.', 'Learning note'],
  ['A shared home needs shared responsibility.', 'Everyday reminder'],
];

let quoteIndex = Number(localStorage.getItem('quote')) || 0;

function showQuote() {
  const quoteText = $('#quoteText');
  const quoteSource = $('#quoteSource');

  if (!quoteText || !quoteSource) {
    return;
  }

  quoteText.textContent = `“${quotes[quoteIndex][0]}”`;
  quoteSource.textContent = `— ${quotes[quoteIndex][1]}`;
}

showQuote();

const nextQuoteButton = $('#nextQuote');
if (nextQuoteButton) {
  nextQuoteButton.addEventListener('click', () => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    localStorage.setItem('quote', String(quoteIndex));
    showQuote();
  });
}

const copyQuoteButton = $('#copyQuote');
if (copyQuoteButton) {
  copyQuoteButton.addEventListener('click', async () => {
    const quoteText = $('#quoteText');

    if (!quoteText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(quoteText.textContent);
      copyQuoteButton.textContent = 'Copied ✓';
    } catch (error) {
      alert(quoteText.textContent);
    }
  });
}

const storyForm = $('#storyForm');
if (storyForm) {
  storyForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const storedStories = JSON.parse(localStorage.getItem('stories') || '[]');
    storedStories.push(Object.fromEntries(new FormData(event.target)));

    localStorage.setItem('stories', JSON.stringify(storedStories));

    const formMsg = $('#formMsg');
    if (formMsg) {
      formMsg.textContent = 'Saved in this browser demo. Thank you for sharing.';
    }

    event.target.reset();
  });
}

const quizQuestions = [
  {
    category: 'Being a partner · 1 of 5',
    question: 'Who usually remembers your partner’s appointments and important dates?',
    options: [
      ['Mostly me', 2],
      ['Mostly my partner', 0],
      ['We both remember', 0],
      ['We use a shared calendar', 1],
    ],
  },
  {
    category: 'Being a partner · 2 of 5',
    question: 'When your partner is stressed, who usually notices and plans support?',
    options: [
      ['Usually me', 2],
      ['Usually my partner', 0],
      ['We talk about it together', 0],
      ['We are still learning', 1],
    ],
  },
  {
    category: 'Being a partner · 3 of 5',
    question: 'Who starts conversations about sharing household responsibilities?',
    options: [
      ['I usually start them', 2],
      ['My partner usually starts them', 0],
      ['We schedule regular check-ins', 0],
      ['We rarely discuss it', 1],
    ],
  },
  {
    category: 'Being a partner · 4 of 5',
    question: 'When your partner forgets a task, what usually happens?',
    options: [
      ['I remind them or finish it', 2],
      ['They handle it themselves', 0],
      ['We solve it without blame', 0],
      ['It depends on the task', 1],
    ],
  },
  {
    category: 'Being a partner · 5 of 5',
    question: 'Who usually plans time for rest, dates, or connection in the relationship?',
    options: [
      ['Mostly me', 2],
      ['Mostly my partner', 0],
      ['We plan it together', 0],
      ['We wait until someone remembers', 1],
    ],
  },
  {
    category: 'Being a mother · 1 of 5',
    question: 'Who usually remembers school dates, forms, and messages?',
    options: [
      ['Mostly me', 2],
      ['Another caregiver', 0],
      ['We share school communication', 0],
      ['It changes each week', 1],
    ],
  },
  {
    category: 'Being a mother · 2 of 5',
    question: 'Who usually prepares what a child needs before leaving home?',
    options: [
      ['I prepare most things', 2],
      ['Another caregiver prepares them', 0],
      ['The child prepares with support', 0],
      ['We divide it by day', 1],
    ],
  },
  {
    category: 'Being a mother · 3 of 5',
    question: 'Who usually notices when a child needs new clothes, supplies, or medicine?',
    options: [
      ['Usually me', 2],
      ['Usually another adult', 0],
      ['We check together', 0],
      ['We notice only when it is urgent', 1],
    ],
  },
  {
    category: 'Being a mother · 4 of 5',
    question: 'Who usually arranges childcare when you need personal time?',
    options: [
      ['I arrange it myself', 2],
      ['Someone else arranges it', 0],
      ['We plan care together', 0],
      ['I rarely get personal time', 1],
    ],
  },
  {
    category: 'Being a mother · 5 of 5',
    question: 'When your child has an appointment, who handles the follow-up plan?',
    options: [
      ['Usually me', 2],
      ['The other caregiver', 0],
      ['We write down clear owners', 0],
      ['We decide as issues come up', 1],
    ],
  },
  {
    category: 'Household chores · 1 of 5',
    question: 'Who usually plans meals and checks what food is available?',
    options: [
      ['Mostly me', 2],
      ['Mostly someone else', 0],
      ['We plan meals together', 0],
      ['We decide at the last minute', 1],
    ],
  },
  {
    category: 'Household chores · 2 of 5',
    question: 'Who notices first that laundry, cleaning, or supplies need attention?',
    options: [
      ['Usually me', 2],
      ['Usually another person', 0],
      ['We use a shared list', 0],
      ['It depends on the room or task', 1],
    ],
  },
  {
    category: 'Household chores · 3 of 5',
    question: 'Who usually finishes the hidden parts of a chore, such as folding or putting things away?',
    options: [
      ['Mostly me', 2],
      ['Mostly another person', 0],
      ['The person who starts it finishes it', 0],
      ['We do not have a set pattern', 1],
    ],
  },
  {
    category: 'Household chores · 4 of 5',
    question: 'When a chore is shared, who decides when it is truly finished?',
    options: [
      ['Usually me', 2],
      ['Usually someone else', 0],
      ['We agree on what finished means', 0],
      ['We sometimes disagree', 1],
    ],
  },
  {
    category: 'Household chores · 5 of 5',
    question: 'How are recurring chores assigned in your home?',
    options: [
      ['People wait for me to assign them', 2],
      ['Each person owns regular tasks', 0],
      ['We rotate them fairly', 0],
      ['We are still working it out', 1],
    ],
  },
  {
    category: 'Paid work · 1 of 5',
    question: 'After a workday, who usually continues with household planning?',
    options: [
      ['Mostly me', 2],
      ['Mostly another person', 0],
      ['We share the evening work', 0],
      ['It changes with our schedules', 1],
    ],
  },
  {
    category: 'Paid work · 2 of 5',
    question: 'Who adjusts their work schedule when a family appointment appears?',
    options: [
      ['Usually me', 2],
      ['Usually someone else', 0],
      ['We alternate when possible', 0],
      ['We decide case by case', 1],
    ],
  },
  {
    category: 'Paid work · 3 of 5',
    question: 'Who is expected to answer family messages during work hours?',
    options: [
      ['Usually me', 2],
      ['Usually another caregiver', 0],
      ['The person who is available', 0],
      ['We have not agreed', 1],
    ],
  },
  {
    category: 'Paid work · 4 of 5',
    question: 'Who carries the work of planning around leave, holidays, and school breaks?',
    options: [
      ['Mostly me', 2],
      ['Mostly someone else', 0],
      ['We plan it together', 0],
      ['We make rushed plans', 1],
    ],
  },
  {
    category: 'Paid work · 5 of 5',
    question: 'What happens when your paid work and care responsibilities conflict?',
    options: [
      ['I usually absorb the impact', 2],
      ['Another person usually adjusts', 0],
      ['We share the adjustment', 0],
      ['We negotiate each time', 1],
    ],
  },
  {
    category: 'Caregiving · 1 of 5',
    question: 'Who usually remembers an older relative’s medicines and appointments?',
    options: [
      ['Mostly me', 2],
      ['Another relative', 0],
      ['We use a shared care plan', 0],
      ['The responsibility moves around', 1],
    ],
  },
  {
    category: 'Caregiving · 2 of 5',
    question: 'Who coordinates transport when someone needs care?',
    options: [
      ['Usually me', 2],
      ['Usually another person', 0],
      ['We arrange it together', 0],
      ['We ask for help only in emergencies', 1],
    ],
  },
  {
    category: 'Caregiving · 3 of 5',
    question: 'Who keeps relatives updated about a family member’s needs?',
    options: [
      ['Mostly me', 2],
      ['Mostly another relative', 0],
      ['We share updates in one place', 0],
      ['Updates are informal', 1],
    ],
  },
  {
    category: 'Caregiving · 4 of 5',
    question: 'When a caregiver needs rest, what usually happens?',
    options: [
      ['I keep going or arrange my own replacement', 2],
      ['Someone else steps in', 0],
      ['We have a backup plan', 0],
      ['We decide at the last minute', 1],
    ],
  },
  {
    category: 'Caregiving · 5 of 5',
    question: 'Who remembers the emotional needs of the people receiving care?',
    options: [
      ['Usually me', 2],
      ['Usually another caregiver', 0],
      ['We check in together', 0],
      ['We focus mostly on practical tasks', 1],
    ],
  },
  {
    category: 'Your wellbeing · 1 of 5',
    question: 'Who protects time for your rest and personal appointments?',
    options: [
      ['I have to protect it myself', 2],
      ['Someone else helps protect it', 0],
      ['We treat it as a shared priority', 0],
      ['It is difficult to make time', 1],
    ],
  },
  {
    category: 'Your wellbeing · 2 of 5',
    question: 'How often do you feel responsible for keeping everyone comfortable?',
    options: [
      ['Very often', 2],
      ['Rarely', 0],
      ['We share emotional support', 0],
      ['Sometimes', 1],
    ],
  },
  {
    category: 'Your wellbeing · 3 of 5',
    question: 'When you need help, what is easiest for you?',
    options: [
      ['I usually handle things alone', 2],
      ['I can ask and receive support', 0],
      ['We have clear ways to ask for help', 0],
      ['I am learning to ask earlier', 1],
    ],
  },
  {
    category: 'Your wellbeing · 4 of 5',
    question: 'Who notices when you are reaching your limit?',
    options: [
      ['I notice and manage it myself', 2],
      ['Someone close notices', 0],
      ['We check in regularly', 0],
      ['Usually nobody notices', 1],
    ],
  },
  {
    category: 'Your wellbeing · 5 of 5',
    question: 'What would you most like to change after this reflection?',
    options: [
      ['Stop being the default person for everything', 2],
      ['Keep improving how we share tasks', 0],
      ['Create a clearer plan together', 0],
      ['Start by naming one invisible task', 1],
    ],
  },
  {
    category: 'Family relationships · 1 of 5',
    question: 'Who usually keeps relatives connected and informed?',
    options: [
      ['Mostly me', 2],
      ['Another family member', 0],
      ['We share updates', 0],
      ['It depends on the situation', 1],
    ],
  },
  {
    category: 'Family relationships · 2 of 5',
    question: 'Who usually plans family visits, celebrations, or reunions?',
    options: [
      ['Mostly me', 2],
      ['Someone else usually plans them', 0],
      ['We plan them together', 0],
      ['The person with the most time plans them', 1],
    ],
  },
  {
    category: 'Family relationships · 3 of 5',
    question: 'When family members need help, who is expected to respond first?',
    options: [
      ['Usually me', 2],
      ['The person who is asked directly', 0],
      ['We decide together', 0],
      ['It is not clear', 1],
    ],
  },
  {
    category: 'Family relationships · 4 of 5',
    question: 'Who remembers family preferences, sensitivities, and important details?',
    options: [
      ['Mostly me', 2],
      ['Different people remember different things', 0],
      ['We write important details down', 0],
      ['We sometimes forget', 1],
    ],
  },
  {
    category: 'Family relationships · 5 of 5',
    question: 'How are family expectations discussed?',
    options: [
      ['I usually explain and coordinate them', 2],
      ['Everyone knows what they are responsible for', 0],
      ['We discuss expectations openly', 0],
      ['We avoid difficult conversations', 1],
    ],
  },
  {
    category: 'Finances · 1 of 5',
    question: 'Who usually tracks bills, due dates, and household expenses?',
    options: [
      ['Mostly me', 2],
      ['Mostly another person', 0],
      ['We use a shared system', 0],
      ['We check only when needed', 1],
    ],
  },
  {
    category: 'Finances · 2 of 5',
    question: 'Who usually plans for unexpected household costs?',
    options: [
      ['Usually me', 2],
      ['Usually someone else', 0],
      ['We plan an emergency fund together', 0],
      ['We handle costs as they happen', 1],
    ],
  },
  {
    category: 'Finances · 3 of 5',
    question: 'Who compares prices and decides when household items need replacing?',
    options: [
      ['Mostly me', 2],
      ['Mostly another person', 0],
      ['We decide together', 0],
      ['The decision is usually rushed', 1],
    ],
  },
  {
    category: 'Finances · 4 of 5',
    question: 'Who carries the worry when money feels tight?',
    options: [
      ['Mostly me', 2],
      ['Mostly another person', 0],
      ['We talk about it and plan together', 0],
      ['We try not to discuss it', 1],
    ],
  },
  {
    category: 'Finances · 5 of 5',
    question: 'How are financial decisions shared in your household?',
    options: [
      ['I research and bring the options', 2],
      ['Another person handles the decisions', 0],
      ['We both have access and decide together', 0],
      ['We are still building a system', 1],
    ],
  },
  {
    category: 'Community responsibilities · 1 of 5',
    question: 'Who usually organizes school, neighborhood, or community activities?',
    options: [
      ['Mostly me', 2],
      ['Mostly another person', 0],
      ['The group shares organizing', 0],
      ['A different person does it each time', 1],
    ],
  },
  {
    category: 'Community responsibilities · 2 of 5',
    question: 'Who remembers volunteer commitments and community deadlines?',
    options: [
      ['Usually me', 2],
      ['Usually someone else', 0],
      ['We use shared reminders', 0],
      ['We remember when reminded', 1],
    ],
  },
  {
    category: 'Community responsibilities · 3 of 5',
    question: 'Who is expected to bring food, supplies, or materials to group events?',
    options: [
      ['Usually me', 2],
      ['Different people contribute', 0],
      ['We assign supplies in advance', 0],
      ['It is often unclear', 1],
    ],
  },
  {
    category: 'Community responsibilities · 4 of 5',
    question: 'When a community problem appears, who starts finding a solution?',
    options: [
      ['Usually me', 2],
      ['A designated leader', 0],
      ['We discuss it as a group', 0],
      ['The person most affected', 1],
    ],
  },
  {
    category: 'Community responsibilities · 5 of 5',
    question: 'How are community responsibilities kept fair?',
    options: [
      ['I remind people and follow up', 2],
      ['Roles are clear and rotated', 0],
      ['We review the workload together', 0],
      ['We are still trying to make it fair', 1],
    ],
  },
];

const quizGroups = [];
quizQuestions.forEach((question) => {
  const categoryName = question.category.split(' · ')[0];
  let group = quizGroups.find((item) => item.name === categoryName);

  if (!group) {
    group = { name: categoryName, questions: [] };
    quizGroups.push(group);
  }

  group.questions.push(question);
});

let selectedGroupIndex = null;
let quizScore = 0;
const quizAnswers = [];

function drawQuizPanels() {
  const chooserEl = $('#quizChooser');
  const categoriesEl = $('#quizCategories');
  const panelsEl = $('#quizPanels');

  if (!chooserEl || !categoriesEl || !panelsEl) {
    return;
  }

  categoriesEl.innerHTML = '';
  panelsEl.innerHTML = '';

  quizGroups.forEach((group, groupIndex) => {
    const categoryButton = document.createElement('button');
    categoryButton.className = 'quizCategory card';
    categoryButton.type = 'button';

    const categoryNumber = document.createElement('span');
    categoryNumber.className = 'pill';
    categoryNumber.textContent = `0${groupIndex + 1}`;

    const categoryTitle = document.createElement('h3');
    categoryTitle.textContent = group.name;

    const categoryDescription = document.createElement('p');
    categoryDescription.textContent = '5 questions to explore your experience.';

    categoryButton.append(categoryNumber, categoryTitle, categoryDescription);
    categoryButton.addEventListener('click', () => {
      selectedGroupIndex = groupIndex;
      quizAnswers.length = 0;
      chooserEl.hidden = true;
      panelsEl.hidden = false;
      [...panelsEl.children].forEach((panel) => {
        panel.hidden = true;
      });
      panelsEl.children[groupIndex].hidden = false;
      panelsEl.children[groupIndex].focus();
    });

    categoriesEl.append(categoryButton);
  });

  quizGroups.forEach((group, groupIndex) => {
    const panel = document.createElement('section');
    panel.className = 'card quizPanelGroup';
    panel.hidden = true;

    const countEl = document.createElement('div');
    countEl.className = 'eyebrow';
    countEl.textContent = `Quiz panel ${groupIndex + 1} of ${quizGroups.length}`;

    const titleEl = document.createElement('h2');
    titleEl.textContent = group.name;

    const progress = document.createElement('div');
    progress.className = 'progress';
    progress.innerHTML = `<span style="width: ${((groupIndex + 1) / quizGroups.length) * 100}%"></span>`;

    const status = document.createElement('p');
    status.className = 'formStatus quizPanelStatus';
    status.setAttribute('role', 'status');

    const questionArea = document.createElement('div');
    questionArea.className = 'quizQuestionArea';

    let questionIndex = 0;

    function renderQuestion() {
      const question = group.questions[questionIndex];
      const questionBlock = document.createElement('div');
      questionBlock.className = 'quizQuestionBlock';

      const questionTitle = document.createElement('h3');
      questionTitle.textContent = `${questionIndex + 1}. ${question.question}`;
      questionBlock.append(questionTitle);

      const options = document.createElement('div');
      options.className = 'quizPanelOptions';

      question.options.forEach(([optionText, score]) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'option';
        optionButton.type = 'button';
        optionButton.textContent = optionText;
    optionButton.setAttribute('aria-pressed', 'false');

        optionButton.addEventListener('click', () => {
          $$('.option', options).forEach((option) => option.classList.remove('selected'));
          optionButton.classList.add('selected');
          quizAnswers[questionIndex] = {
            category: group.name,
            question: question.question,
            answer: optionText,
            score,
          };
          status.textContent = '';
        });

        options.append(optionButton);
      });

      questionBlock.append(options);
      questionArea.replaceChildren(questionBlock);
      countEl.textContent = `${group.name} · Question ${questionIndex + 1} of ${group.questions.length}`;
      progress.innerHTML = `<span style="width: ${((questionIndex + 1) / group.questions.length) * 100}%"></span>`;
      nextButton.textContent = questionIndex === group.questions.length - 1
        ? 'See my reflection'
        : 'Next question';
    }

    const nextButton = document.createElement('button');
    nextButton.className = 'btn';
    nextButton.type = 'button';
    nextButton.textContent = 'See my reflection';

    nextButton.addEventListener('click', () => {
      if (quizAnswers[questionIndex] === undefined) {
        status.textContent = 'Choose an answer before continuing.';
        return;
      }

      if (questionIndex < group.questions.length - 1) {
        questionIndex += 1;
        renderQuestion();
        return;
      }

      quizScore = quizAnswers.reduce((total, answer) => total + (answer ? answer.score : 0), 0);
      showQuizResult();
    });

    const backButton = document.createElement('button');
    backButton.className = 'btn alt quizBackButton';
    backButton.type = 'button';
    backButton.textContent = 'Choose another theme';
    backButton.addEventListener('click', () => {
      panelsEl.hidden = true;
      chooserEl.hidden = false;
      quizAnswers.length = 0;
    });

    panel.append(questionArea, status, nextButton, backButton);
    panelsEl.append(panel);
    renderQuestion();
  });
}

drawQuizPanels();

function showQuizResult() {
  const quizPanels = $('#quizPanels');
  const quizResult = $('#quizResult');
  const resultTitle = $('#quizResultTitle');
  const resultText = $('#quizResultText');
  const resultAction = $('#quizResultAction');
  const chooserEl = $('#quizChooser');

  if (!quizPanels || !quizResult || !resultTitle || !resultText || !resultAction || !chooserEl) {
    return;
  }

  const selectedAnswers = quizAnswers.filter(Boolean);
  const highLoadAnswers = selectedAnswers.filter((item) => item.score >= 2);
  const sharedAnswers = selectedAnswers.filter((item) => item.score === 0);
  const teamBasedAnswers = selectedAnswers.filter((item) => /we|shared|together|rotate|clear|plan/i.test(item.answer));
  const themeName = quizGroups[selectedGroupIndex]?.name || 'this area of life';
  const heavyPattern = highLoadAnswers.length >= 3;
  const balancedPattern = sharedAnswers.length >= 3 || teamBasedAnswers.length >= 3;

  const result = heavyPattern
    ? {
        title: `In ${themeName}, you are carrying a lot of the invisible load.`,
        text: 'Your answers show a pattern where you are often the one noticing, remembering, planning, and making sure things still happen. That is not a small task—it is emotional labour, practical management, and ongoing care all at once. You are not weak for feeling tired; you are human, and this pattern is heavy.',
        action: `You are doing more than many people would notice, and it is okay to stop carrying this alone. The strongest next step is not to do everything perfectly—it is to name one place where the responsibility can be shared, one person who can take ownership, and one conversation you can start this week. In ${themeName}, you deserve support, not just endurance.`,
      }
    : balancedPattern
      ? {
          title: `You already have a strong foundation in ${themeName}.`,
          text: 'Many of your answers show that you are already working in a more shared, thoughtful, and fair way. That means you understand the value of clear roles, communication, and teamwork. You are not starting from zero—you are building something healthier and more sustainable.',
          action: `Keep protecting that rhythm. The next step is to notice the moments where responsibility still slips back to one person and make them visible before they become a burden. You are already doing something powerful by asking how things can be shared more gently and more clearly.`,
        }
      : {
          title: `You are in a meaningful growth moment in ${themeName}.`,
          text: 'Your answers suggest you are beginning to notice where the mental load is uneven and where changes could make life feel lighter. That awareness is not small—it is the beginning of real improvement. You are learning to see the work that often goes unseen, and that is a powerful step forward.',
          action: `Keep following that insight with one practical change. Pick one task that feels fuzzy, one person who could help, and one clear step you can take this week. You do not need a perfect system right away. You just need one honest, brave move toward a fairer rhythm, and that is already a big win.`,
        };

  resultTitle.textContent = result.title;
  resultText.textContent = result.text;
  resultAction.textContent = result.action;
  quizPanels.hidden = true;
  chooserEl.hidden = true;
  quizResult.hidden = false;
}

const quizRestartButton = $('#quizRestart');
if (quizRestartButton) {
  quizRestartButton.addEventListener('click', () => {
    selectedGroupIndex = null;
    quizScore = 0;
    quizAnswers.length = 0;
    $('#quizPanels').hidden = true;
    $('#quizChooser').hidden = false;
    $('#quizResult').hidden = true;
    drawQuizPanels();
  });
}

const mythCards = $$('[data-myth]');
mythCards.forEach((card) => {
  const buttons = card.querySelectorAll('.mythBtn');
  const feedback = card.querySelector('.mythFeedback');
  const explanation = card.querySelector('.mythExplanation');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!feedback) {
        return;
      }

      if (explanation) {
        explanation.hidden = false;
      }

      const isCorrect = button.dataset.answer === card.dataset.myth;
      feedback.textContent = isCorrect
        ? '✓ Correct direction. Read the explanation below.'
        : 'Try again and examine the wording carefully.';
    });
  });
});

const contextDetails = {
  household: {
    title: 'Household roles',
    text: 'Notice who is expected to notice needs, make plans, and follow up, not only who completes the visible task.',
    prompt: 'Try asking: “What needs to happen, and who owns it from start to finish?”',
  },
  caregiving: {
    title: 'Caregiving',
    text: 'Care can move between parents, grandparents, siblings, relatives, and paid helpers. Coordination is work too.',
    prompt: 'Try asking: “What support does each caregiver need to keep this arrangement sustainable?”',
  },
  economic: {
    title: 'Economic realities',
    text: 'Income, commuting, schedules, and access to services can change what is possible. Fairness should account for those constraints.',
    prompt: 'Try asking: “What adjustment would make this responsibility more realistic for everyone?”',
  },
};

const contextButtons = $$('[data-context]');
const contextTitle = $('#contextTitle');
const contextText = $('#contextText');
const contextPrompt = $('#contextPrompt');

contextButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const details = contextDetails[button.dataset.context];

    if (!details || !contextTitle || !contextText || !contextPrompt) {
      return;
    }

    contextButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    contextTitle.textContent = details.title;
    contextText.textContent = details.text;
    contextPrompt.textContent = details.prompt;
  });
});

const actionChecks = $$('[data-action]');
const actionStatus = $('#actionStatus');

function updateActionStatus() {
  const selectedCount = actionChecks.filter((check) => check.checked).length;

  if (actionStatus) {
    actionStatus.textContent = `${selectedCount} of ${actionChecks.length} actions selected.`;
  }
}

actionChecks.forEach((check) => {
  const savedValue = localStorage.getItem(`action-${check.dataset.action}`);
  check.checked = savedValue === 'true';

  check.addEventListener('change', () => {
    localStorage.setItem(`action-${check.dataset.action}`, String(check.checked));
    updateActionStatus();
  });
});

updateActionStatus();

const taskDetails = {
  Cooking: {
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=85',
    subtitle: 'A meal is visible. The thinking behind it often is not.',
    question: 'When does the work of cooking really begin?',
    answer: 'Often before the stove is turned on. Someone may first notice what is available, remember preferences and needs, plan the meal and timing, prepare it, and then think about leftovers or what needs restocking.',
    stages: [['Notice','Check what food and ingredients are available.'],['Remember','Keep track of preferences, dietary needs, and supplies.'],['Plan','Decide the meal, budget, preparation, and timing.'],['Do','Prepare and cook the meal.'],['Follow Up','Store leftovers, clean up, and notice what needs restocking.']],
    takeaway: 'The meal is visible. Deciding, remembering, planning, and following up are part of the mental load behind it.'
  },
  Groceries: {
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=85',
    subtitle: 'Shopping is only one part of keeping a household supplied.',
    question: 'Does grocery work begin at the store?',
    answer: 'Usually not. The invisible work can begin with noticing what is running low, remembering regular needs, planning meals and a budget, choosing when to shop, and tracking what will be needed next.',
    stages: [['Notice','See what is running low or missing at home.'],['Remember','Keep track of regular items, preferences, and upcoming needs.'],['Plan','Make the list, set the budget, and decide when and where to shop.'],['Do','Buy the needed items.'],['Follow Up','Put items away and remember what will need replacing next.']],
    takeaway: 'The shopping trip is visible. Monitoring supplies and planning ahead are the less visible parts.'
  },
  Childcare: {
    image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=1400&q=85',
    subtitle: 'Care includes anticipating needs as well as responding to them.',
    question: 'Is childcare only the time spent directly caring for a child?',
    answer: 'Direct care is important, but there can also be invisible coordination: remembering school requirements, preparing supplies, tracking routines, arranging transport, and anticipating what may be needed next.',
    stages: [['Notice','Recognize daily, school, health, and emotional needs.'],['Remember','Keep track of deadlines, supplies, appointments, and routines.'],['Plan','Coordinate meals, transport, schoolwork, activities, and care.'],['Do','Provide the care or support that is needed.'],['Follow Up','Check what changed and prepare for the next need or schedule.']],
    takeaway: 'Care is not only the visible moment of helping. Anticipation and coordination can also require mental effort.'
  },
  Cleaning: {
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85',
    subtitle: 'A tidy space can depend on repeated noticing and planning.',
    question: 'Is cleaning only the moment someone picks up a broom or cloth?',
    answer: 'The visible cleaning is one step. Someone may also notice what needs attention, remember recurring chores, decide priorities, check supplies, make time for the work, and maintain the space afterward.',
    stages: [['Notice','See which spaces or items need attention.'],['Remember','Keep track of recurring chores and cleaning supplies.'],['Plan','Decide what to clean, when to do it, and what is needed.'],['Do','Clean and organize the space.'],['Follow Up','Put things back, replace supplies, and notice what needs attention next.']],
    takeaway: 'A clean space is visible. The repeated monitoring and planning that maintains it can be easy to miss.'
  },
  'Family Schedules': {
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1400&q=85',
    subtitle: 'A calendar can represent much more than dates and times.',
    question: 'Is adding an event to a calendar the whole scheduling task?',
    answer: 'Scheduling can also mean gathering details, remembering deadlines, checking availability, arranging transport, sending reminders, preparing what is needed, and adjusting when plans change.',
    stages: [['Notice','Identify appointments, deadlines, events, and possible conflicts.'],['Remember','Keep track of dates, times, requirements, and commitments.'],['Plan','Coordinate availability, transport, reminders, and preparation.'],['Do','Carry out the scheduled activity or arrangement.'],['Follow Up','Confirm what was completed and prepare for upcoming commitments.']],
    takeaway: 'The calendar is visible. Coordinating the details that make the schedule work is often less visible.'
  },
  'Family Care': {
    image: 'https://images.unsplash.com/photo-1576765608866-5b51046452e4?auto=format&fit=crop&w=1400&q=85',
    subtitle: 'Supporting someone can involve ongoing coordination.',
    question: 'Is family care only the moment someone gives direct help?',
    answer: 'Direct help is one part. Care can also involve noticing changing needs, remembering routines or appointments, arranging transport or supplies, communicating with others, and checking what support is needed afterward.',
    stages: [['Notice','Recognize when a family member may need practical or emotional support.'],['Remember','Keep track of routines, appointments, medicines, supplies, or preferences.'],['Plan','Arrange time, transportation, resources, and support with others.'],['Do','Provide the needed care or assistance.'],['Follow Up','Check how the person is doing and what support may be needed next.']],
    takeaway: 'The act of helping is visible. Remembering, coordinating, and following up can be part of the invisible responsibility.'
  }
};

const taskCards = $$('[data-task]');
const taskGridSection = $('#tasks');
const taskDetailView = $('#task-detail');
const taskBackButton = $('#back-to-tasks');
const taskDetailHero = $('#task-detail-hero');
const taskInsightList = $('#task-insights');
const issuePageWrap = $('.issue-wrap');

function showTaskDetail(taskName) {
  const details = taskDetails[taskName];

  if (!details || !taskDetailView || !taskGridSection) {
    return;
  }

  $('#task-detail-badge').textContent = taskName;
  $('#task-detail-title').textContent = taskName;
  $('#task-detail-subtitle').textContent = details.subtitle;
  $('#task-detail-question').textContent = details.question;
  $('#task-detail-answer').textContent = details.answer;
  $('#task-detail-takeaway').textContent = details.takeaway;
  taskDetailHero.style.backgroundImage = `linear-gradient(0deg, rgba(255,250,244,0.08), rgba(0,0,0,0.06)), url("${details.image}")`;

  taskInsightList.replaceChildren(...details.stages.map(([stage, description], index) => {
    const insight = document.createElement('article');
    insight.className = 'task-insight';
    const number = document.createElement('span');
    number.className = 'task-stage-number';
    number.textContent = String(index + 1).padStart(2, '0');
    const body = document.createElement('div');
    const stageName = document.createElement('strong');
    stageName.className = 'task-stage-name';
    stageName.textContent = stage;
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    body.append(stageName, descriptionElement);
    insight.append(number, body);
    return insight;
  }));

  taskGridSection.hidden = true;
  $('.issue-hero').hidden = true;
  $('.how-it-works').hidden = true;
  issuePageWrap?.classList.add('task-detail-active');
  taskDetailView.hidden = false;
  taskDetailView.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

if (taskDetailView && taskBackButton) {
  taskCards.forEach((card) => {
    card.addEventListener('click', () => showTaskDetail(card.dataset.task));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        showTaskDetail(card.dataset.task);
      }
    });
  });

  taskBackButton.addEventListener('click', () => {
    taskDetailView.hidden = true;
    taskGridSection.hidden = false;
    $('.issue-hero').hidden = false;
    $('.how-it-works').hidden = false;
    issuePageWrap?.classList.remove('task-detail-active');
    taskGridSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

const dataSets = {
  time: {
    planning: ['Planning', 75],
    tasks: ['Household tasks', 68],
    care: ['Childcare', 82],
  },
  work: {
    planning: ['Planning ahead', 88],
    tasks: ['Physical tasks', 72],
    care: ['Emotional support', 64],
  },
};

const dataView = $('#dataView');
const dataBars = $$('[data-bar]');

function drawDataChart(viewName = 'time') {
  const selectedData = dataSets[viewName] || dataSets.time;

  dataBars.forEach((barBox) => {
    const values = selectedData[barBox.dataset.bar];
    const label = barBox.querySelector('.barLabel');
    const bar = barBox.querySelector('.bar');
    const value = barBox.querySelector('.barValue');

    if (!values || !label || !bar || !value) {
      return;
    }

    label.textContent = values[0];
    value.textContent = `${values[1]}%`;
    bar.style.height = `${values[1]}%`;
    bar.setAttribute('aria-label', `${values[0]}: ${values[1]} percent`);
  });
}

if (dataView) {
  dataView.addEventListener('change', () => drawDataChart(dataView.value));
}

drawDataChart();

const scenarios = [
  {
    title: 'The forgotten appointment',
    question: 'A family appointment is missed because one person was expected to remember it. What supports shared responsibility?',
    options: [
      ['Wait for the same person to remember next time.', 'A reminder is useful, but ownership should be shared.'],
      ['Blame the person who forgot.', 'Blame does not redistribute the planning work.'],
      ['Agree on who owns the appointment and record it in a shared calendar.', 'Shared ownership makes the invisible planning visible.'],
    ],
  },
  {
    title: 'The always-on caregiver',
    question: 'One person handles every care request because everyone assumes they are available. What is a fair next step?',
    options: [
      ['Ask them to keep doing it because they are experienced.', 'Experience should not become a permanent unpaid assignment.'],
      ['List the care tasks and create a rotating plan.', 'A visible plan gives everyone a chance to contribute.'],
      ['Wait until they ask for help.', 'The person carrying the load should not have to manage the solution too.'],
    ],
  },
  {
    title: 'The prenatal checkup',
    question: 'A woman is expected to remember every prenatal appointment while also arranging transport. What supports her?',
    options: [
      ['Tell her to manage the calendar because it concerns her body.', 'Health care may be personal, but practical support can be shared.'],
      ['Ask what support she wants and share transport and calendar planning.', 'Support should reduce the planning burden without taking away her choices.'],
      ['Wait for her to ask each time.', 'The person carrying the load should not have to coordinate every offer of help.'],
    ],
  },
  {
    title: 'The child health visit',
    question: 'A mother remembers a child’s checkup, forms, records, and follow-up alone. What is a fair response?',
    options: [
      ['Thank her and leave the system unchanged.', 'Appreciation matters, but shared ownership changes the workload.'],
      ['Create a shared reminder and assign follow-up to another caregiver.', 'A named owner makes the next steps visible.'],
      ['Ask her to remind everyone again.', 'Repeating reminders keeps the mental load with her.'],
    ],
  },
  {
    title: 'The work appointment',
    question: 'A woman keeps rescheduling her own medical appointment around everyone else’s needs. What would help?',
    options: [
      ['Treat her appointment as optional.', 'Her health deserves the same priority as everyone else’s.'],
      ['Coordinate backup care so she can attend at the agreed time.', 'Shared planning protects her time and health.'],
      ['Ask her to find another free day.', 'Finding another day still leaves the planning work with her.'],
    ],
  },
  {
    title: 'The grandmother’s appointment',
    question: 'A daughter is automatically expected to book and attend her mother’s appointments. What is a better approach?',
    options: [
      ['Assume daughters are naturally better caregivers.', 'Caregiving is learned work, not a gender destiny.'],
      ['Discuss a rotation based on availability and the grandmother’s preferences.', 'A shared plan respects both the caregiver and the person receiving care.'],
      ['Wait until the daughter becomes overwhelmed.', 'Support should be planned before someone reaches a breaking point.'],
    ],
  },
  {
    title: 'The school conference',
    question: 'A mother is always contacted by the school and expected to remember every meeting. What should happen?',
    options: [
      ['Keep her as the only contact because she is already informed.', 'Being informed should not mean carrying every follow-up task.'],
      ['Share school communication and alternate who attends meetings.', 'Shared access and rotating attendance distribute responsibility.'],
      ['Ask her to forward every message manually.', 'Forwarding messages adds another invisible task.'],
    ],
  },
  {
    title: 'The health screening',
    question: 'A woman postpones a health screening because she cannot find time away from care work. What is needed?',
    options: [
      ['Tell her to make time somehow.', 'Advice does not solve the practical care gap.'],
      ['Arrange care coverage before the appointment is booked.', 'Planning support makes her health appointment possible.'],
      ['Book it without asking her schedule.', 'Support should respect her consent and availability.'],
    ],
  },
  {
    title: 'The menstrual health visit',
    question: 'A teenager is expected to arrange her own reproductive health appointment while adults avoid the topic. What supports her?',
    options: [
      ['Leave her alone because it is private.', 'Privacy and age-appropriate support can exist together.'],
      ['Offer confidential help with scheduling, transport, and questions.', 'Practical support can respect her choices and dignity.'],
      ['Ask another woman in the family to handle everything.', 'Support should not automatically become another woman’s burden.'],
    ],
  },
  {
    title: 'The therapy appointment',
    question: 'A woman’s therapy appointment is treated as less important than household errands. What is fair?',
    options: [
      ['Move the appointment whenever someone needs help.', 'Mental health care is real care and deserves protected time.'],
      ['Protect the appointment and redistribute the errands.', 'Shared responsibility makes room for her well-being.'],
      ['Ask her to attend only when the house is quiet.', 'Waiting for perfect conditions keeps the burden on her.'],
    ],
  },
  {
    title: 'The postpartum visit',
    question: 'After childbirth, a new mother remembers the baby’s visits while no one tracks her follow-up care. What should change?',
    options: [
      ['Focus only on the baby’s schedule.', 'The caregiver’s recovery also needs attention.'],
      ['Track both the baby’s and mother’s appointments with shared support.', 'Care plans should include the person doing the caring.'],
      ['Wait for her to mention symptoms.', 'She should not have to manage everyone’s awareness alone.'],
    ],
  },
  {
    title: 'The eldercare call',
    question: 'Relatives call one woman whenever an elderly family member needs an appointment. What is a fair system?',
    options: [
      ['Keep calling her because she knows the history.', 'Knowledge should be documented and shared, not used to assign permanent labor.'],
      ['Create a shared care calendar and distribute appointment tasks.', 'A common system reduces dependence on one person.'],
      ['Tell her to stop answering calls.', 'The goal is shared care, not leaving one person isolated.'],
    ],
  },
  {
    title: 'The appointment reminder',
    question: 'A woman is blamed when another adult misses an appointment she reminded them about. What is the fair expectation?',
    options: [
      ['Make her send more reminders.', 'More reminders increase her invisible workload.'],
      ['Give the person attending ownership of their own appointment.', 'Adults can manage their commitments with shared tools when needed.'],
      ['Cancel all future appointments.', 'Removing care is not a solution to unequal responsibility.'],
    ],
  },
  {
    title: 'The hospital paperwork',
    question: 'During a family hospital visit, a woman is expected to answer questions and manage documents while also providing care. What helps?',
    options: [
      ['Let her handle it because she is calm under pressure.', 'Competence should not become an automatic assignment.'],
      ['Divide communication, paperwork, and emotional support among adults.', 'Different responsibilities can be shared in real time.'],
      ['Ask her to explain everything afterward.', 'Repeating the work later creates another burden.'],
    ],
  },
  {
    title: 'The appointment across town',
    question: 'A woman books a distant appointment and is expected to solve the transport plan alone. What is equitable?',
    options: [
      ['Assume she will find a way.', 'Transport planning is part of the work.'],
      ['Compare routes, costs, and schedules together before confirming.', 'Shared planning makes constraints visible.'],
      ['Tell her to choose a closer provider without checking access.', 'The solution should account for her actual care needs.'],
    ],
  },
  {
    title: 'The missed dental visit',
    question: 'A daughter manages dental appointments for the whole household and misses her own. What should the family do?',
    options: [
      ['Ask her to book a replacement for herself.', 'That leaves the same organizer responsible again.'],
      ['Share household scheduling and protect her replacement appointment.', 'The organizer also deserves care and protected time.'],
      ['Stop scheduling dental care for everyone.', 'Removing necessary care avoids rather than shares the work.'],
    ],
  },
  {
    title: 'The caregiving group chat',
    question: 'A women-only family chat contains every reminder about a relative’s care. What would make it fairer?',
    options: [
      ['Add everyone but keep the women responsible for updates.', 'Including people is not the same as sharing ownership.'],
      ['Assign specific tasks and rotate who posts updates.', 'Clear owners turn conversation into shared action.'],
      ['Delete the chat and rely on memory.', 'Removing a tool increases the chance of missed care.'],
    ],
  },
  {
    title: 'The unpaid time off',
    question: 'A woman repeatedly takes time off work to attend family appointments. What should be discussed?',
    options: [
      ['Accept it because she earns less.', 'Income should not determine whose time is treated as available.'],
      ['Share attendance and discuss the financial impact openly.', 'Fair planning considers time, income, and care needs.'],
      ['Tell her to stop attending appointments.', 'The solution should preserve needed care.'],
    ],
  },
  {
    title: 'The follow-up call',
    question: 'After a doctor’s visit, a woman is expected to remember medication changes and explain them to everyone. What helps?',
    options: [
      ['Ask her to make a detailed family summary every time.', 'That creates another coordination task for her.'],
      ['Record the plan in a shared place and assign follow-up tasks.', 'Information and responsibility should be shared.'],
      ['Assume everyone will remember the conversation.', 'Important care instructions need a reliable system.'],
    ],
  },
  {
    title: 'The young mother’s appointment',
    question: 'A young mother skips an appointment because she cannot bring her child and no one offered childcare. What is fair?',
    options: [
      ['Tell her to wait until the child is older.', 'Delaying care can worsen the problem.'],
      ['Offer childcare options before scheduling the next appointment.', 'Support should address the practical barrier.'],
      ['Ask her to bring the child without checking the clinic rules.', 'The plan should be safe and workable.'],
    ],
  },
  {
    title: 'The appointment language barrier',
    question: 'A woman is always asked to arrange appointments because she is the family member most comfortable with forms or English. What helps?',
    options: [
      ['Keep the task with her because it is faster.', 'Efficiency can hide an unfair concentration of labor.'],
      ['Share forms, learn the process, and use available interpretation support.', 'Skills and access can be distributed instead of assumed.'],
      ['Avoid appointments that require paperwork.', 'Removing care is not a fair solution.'],
    ],
  },
  {
    title: 'The emergency appointment',
    question: 'A woman handles an urgent appointment while everyone else waits for her instructions. What should happen next time?',
    options: [
      ['Keep her as the family emergency coordinator.', 'Emergency competence should not create a permanent role.'],
      ['Review what happened and create a shared emergency plan.', 'Planning afterward can distribute future responsibility.'],
      ['Avoid discussing it because the crisis is over.', 'Reflection helps prevent the same invisible burden.'],
    ],
  },
];

let scenarioIndex = 0;

function drawScenario() {
  const titleEl = $('#scenarioTitle');
  const questionEl = $('#scenarioQuestion');
  const optionsEl = $('#scenarioOptions');
  const feedbackEl = $('#scenarioFeedback');

  if (!titleEl || !questionEl || !optionsEl || !feedbackEl) {
    return;
  }

  const scenario = scenarios[scenarioIndex];
  titleEl.textContent = scenario.title;
  questionEl.textContent = scenario.question;
  feedbackEl.textContent = '';
  optionsEl.innerHTML = '';

  scenario.options.forEach(([optionText, feedbackText]) => {
    const optionButton = document.createElement('button');
    optionButton.className = 'option';
    optionButton.type = 'button';
    optionButton.textContent = optionText;
    optionButton.setAttribute('aria-pressed', 'false');

    optionButton.addEventListener('click', () => {
      $$('.option', optionsEl).forEach((option) => option.classList.remove('selected'));
      optionButton.classList.add('selected');
      $$('.option', optionsEl).forEach((option) => option.setAttribute('aria-pressed', String(option === optionButton)));
      feedbackEl.textContent = feedbackText;
    });

    optionsEl.append(optionButton);
  });
}

drawScenario();

const nextScenarioButton = $('#scenarioNext');
if (nextScenarioButton) {
  nextScenarioButton.addEventListener('click', () => {
    scenarioIndex = (scenarioIndex + 1) % scenarios.length;
    drawScenario();
  });
}

const experienceForm = $('#experienceForm');
const experiencePosts = $('#experiencePosts');
const experienceStatus = $('#experienceStatus');
let storedPosts = JSON.parse(localStorage.getItem('experiencePosts') || '[]');
const legacyStories = JSON.parse(localStorage.getItem('stories') || '[]');

legacyStories.forEach((story, index) => {
  const storyText = story.text || story.story || story.experience;

  if (storyText) {
    storedPosts.push({
      id: `legacy-${index}-${Date.now()}`,
      name: story.name || story.author || 'Anonymous',
      text: storyText,
      comments: [],
    });
  }
});

if (legacyStories.length) {
  localStorage.removeItem('stories');
  localStorage.setItem('experiencePosts', JSON.stringify(storedPosts));
}

function savePosts() {
  localStorage.setItem('experiencePosts', JSON.stringify(storedPosts));
}

const actionMenu = document.createElement('div');
actionMenu.className = 'actionMenu';
actionMenu.hidden = true;
document.body.append(actionMenu);

let actionTarget = null;
let longPressTimer;

function closeActionMenu() {
  actionMenu.hidden = true;
  actionTarget = null;
  actionMenu.innerHTML = '';
}

function removeActionTarget(target = actionTarget) {
  if (!target) {
    return;
  }

  const itemType = target.type === 'post' ? 'post' : 'comment';
  const confirmed = window.confirm(`Are you sure you want to delete this ${itemType}?`);

  if (!confirmed) {
    closeActionMenu();
    return;
  }

  if (target.type === 'post') {
    storedPosts = storedPosts.filter((post) => post.id !== target.postId);
    localStorage.removeItem(`liked-${target.postId}`);
  } else {
    const post = storedPosts.find((item) => item.id === target.postId);
    post?.comments?.splice(target.commentIndex, 1);
  }

  savePosts();
  closeActionMenu();
  renderPosts();
}

function editActionTarget(target = actionTarget) {
  if (!target) {
    return;
  }

  const post = storedPosts.find((item) => item.id === target.postId);
  const item = target.type === 'post'
    ? post
    : post?.comments?.[target.commentIndex];

  if (!item) {
    return;
  }

  const updatedText = window.prompt('Edit your text:', item.text);

  if (updatedText?.trim()) {
    item.text = updatedText.trim();
    savePosts();
    closeActionMenu();
    renderPosts();
  }
}

function openActionMenu(event, target) {
  if (!event) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  actionTarget = target;
  actionMenu.innerHTML = '';

  const actions = [
    ['Edit', editActionTarget],
    ['Delete', removeActionTarget],
  ];

  actions.forEach(([label, handler]) => {
    const actionButton = document.createElement('button');
    actionButton.type = 'button';
    actionButton.textContent = label;
    actionButton.addEventListener('click', (buttonEvent) => {
      buttonEvent.preventDefault();
      buttonEvent.stopPropagation();
      const selectedTarget = actionTarget;
      closeActionMenu();
      handler(selectedTarget);
    });
    actionMenu.append(actionButton);
  });

  actionMenu.hidden = false;
  const menuWidth = 150;
  const menuHeight = 96;
  actionMenu.style.left = `${Math.min(event.clientX, window.innerWidth - menuWidth - 12)}px`;
  actionMenu.style.top = `${Math.min(event.clientY, window.innerHeight - menuHeight - 12)}px`;
}

function bindActionMenu(element, target) {
  element.addEventListener('contextmenu', (event) => {
    event.stopPropagation();
    openActionMenu(event, target);
  });
  element.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'touch') {
      return;
    }

    event.stopPropagation();
    longPressTimer = window.setTimeout(() => {
      openActionMenu(event, target);
    }, 550);
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((eventName) => {
    element.addEventListener(eventName, () => window.clearTimeout(longPressTimer));
  });
}

document.addEventListener('click', (event) => {
  if (!event.target) {
    return;
  }

  if (!actionMenu.contains(event.target) && !event.target.closest('.comment') && !event.target.closest('.post')) {
    closeActionMenu();
  }
});

function createComment(post, comment, postId, commentIndex) {
  const commentEl = document.createElement('div');
  commentEl.className = 'comment';

  const authorEl = document.createElement('strong');
  authorEl.textContent = comment.name || 'Anonymous';

  const textEl = document.createElement('p');
  textEl.textContent = comment.text;

  const commentLikes = Number(comment.likes) || 0;
  const isCommentLiked = Boolean(comment.liked);

  const reactionButton = document.createElement('button');
  reactionButton.type = 'button';
  reactionButton.className = `commentHeartButton${isCommentLiked ? ' liked' : ''}`;
  reactionButton.setAttribute('aria-pressed', String(isCommentLiked));
  reactionButton.innerHTML = `<span aria-hidden="true">♥</span> ${commentLikes}`;
  reactionButton.addEventListener('click', () => {
    const toggledLiked = !isCommentLiked;
    comment.likes = Math.max(0, commentLikes + (toggledLiked ? 1 : -1));
    comment.liked = toggledLiked;
    savePosts();
    renderPosts();
  });

  const commentMeta = document.createElement('div');
  commentMeta.className = 'commentMeta';
  commentMeta.append(reactionButton);

  commentEl.append(authorEl, textEl, commentMeta);
  post.commentsEl.append(commentEl);
  bindActionMenu(commentEl, { type: 'comment', postId, commentIndex });
}

function renderPosts() {
  if (!experiencePosts) {
    return;
  }

  experiencePosts.innerHTML = '';

  if (!storedPosts.length) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'notice';
    emptyMessage.textContent = 'No experiences shared yet. Your story can start the conversation.';
    experiencePosts.append(emptyMessage);
    return;
  }

  [...storedPosts].reverse().forEach((post) => {
    const postEl = document.createElement('article');
    postEl.className = 'post card';
    postEl.dataset.postId = post.id;
    bindActionMenu(postEl, { type: 'post', postId: post.id });

    const postHeader = document.createElement('div');
    postHeader.className = 'postHeader';

    const headingEl = document.createElement('h3');
    headingEl.textContent = post.name || 'Anonymous';

    const likeButton = document.createElement('button');
    const likeKey = `liked-${post.id}`;
    const isLiked = localStorage.getItem(likeKey) === 'true';
    likeButton.className = `likeButton${isLiked ? ' liked' : ''}`;
    likeButton.type = 'button';
    likeButton.setAttribute('aria-pressed', String(isLiked));
    likeButton.innerHTML = `<span aria-hidden="true">♡</span> ${post.likes || 0}`;

    likeButton.addEventListener('click', () => {
      const nextLiked = localStorage.getItem(likeKey) !== 'true';
      const nextLikes = Math.max(0, (post.likes || 0) + (nextLiked ? 1 : -1));

      post.likes = nextLikes;
      localStorage.setItem(likeKey, String(nextLiked));
      savePosts();
      renderPosts();
    });

    postHeader.append(headingEl, likeButton);

    const textEl = document.createElement('p');
    textEl.textContent = post.text;

    const commentsEl = document.createElement('div');
    commentsEl.className = 'comments';

    const commentToggle = document.createElement('button');
    commentToggle.type = 'button';
    commentToggle.className = 'commentToggle';
    commentToggle.setAttribute('aria-expanded', String(Boolean(post.expanded)));
    commentToggle.textContent = `${Boolean(post.expanded) ? '▾' : '▸'} Comments (${(post.comments || []).length})`;
    commentToggle.addEventListener('click', () => {
      post.expanded = !Boolean(post.expanded);
      renderPosts();
    });
    commentsEl.append(commentToggle);

    const commentsBody = document.createElement('div');
    commentsBody.className = 'commentsBody';
    commentsBody.hidden = !Boolean(post.expanded);

    const commentsList = document.createElement('div');
    commentsList.className = 'commentsList';

    const postData = { commentsEl: commentsList };
    (post.comments || []).forEach((comment, commentIndex) => {
      createComment(postData, comment, post.id, commentIndex);
    });

    const commentForm = document.createElement('form');
    commentForm.className = 'commentForm';
    commentForm.innerHTML = `
      <input name="name" maxlength="40" placeholder="Your name (optional)" />
      <input name="text" maxlength="300" required placeholder="Write a supportive comment" />
      <button class="btn alt" type="submit">Comment</button>
    `;

    commentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const comment = Object.fromEntries(new FormData(commentForm));
      const targetPost = storedPosts.find((item) => item.id === post.id);

      if (!targetPost) {
        return;
      }

      targetPost.comments = targetPost.comments || [];
      targetPost.comments.push({
        ...comment,
        likes: 0,
        liked: false,
      });
      savePosts();
      renderPosts();
    });

    commentsBody.append(commentsList, commentForm);
    commentsEl.append(commentsBody);

    postEl.append(postHeader, textEl, commentsEl);
    experiencePosts.append(postEl);
  });
}

if (experienceForm) {
  experienceForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const post = Object.fromEntries(new FormData(experienceForm));

    storedPosts.push({
      id: Date.now(),
      name: post.name,
      text: post.text,
      comments: [],
    });

    savePosts();
    experienceForm.reset();

    if (experienceStatus) {
      experienceStatus.textContent = 'Posted. Others can now respond below.';
    }

    renderPosts();
    experiencePosts?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

renderPosts();


// Philippine Context interactive task cards
const phTaskData = {
  meals:{visible:'Cooking or buying a meal',hidden:'Deciding what to eat, checking ingredients, considering the budget, remembering preferences, shopping, timing preparation, and planning what will be needed next.'},
  school:{visible:'Preparing for school',hidden:'Checking announcements, remembering deadlines, preparing uniforms and materials, signing forms, arranging transport, and following up on requirements.'},
  health:{visible:'Going to a health appointment',hidden:'Noticing symptoms, choosing a provider, scheduling, remembering medicines, preparing documents, arranging transport, and monitoring what happens afterward.'},
  home:{visible:'Cleaning the home',hidden:'Noticing what is dirty or running low, deciding priorities, getting supplies, fitting the task into everyone’s schedule, and remembering when it needs to happen again.'},
  family:{visible:'Caring for a family member',hidden:'Checking needs, coordinating with relatives, arranging meals or medicines, adjusting schedules, anticipating problems, and making sure support continues.'},
  money:{visible:'Paying a household bill',hidden:'Tracking due dates, checking the budget, remembering balances, planning around income, choosing what to prioritize, and confirming that payments went through.'}
};
$$('[data-ph-task]').forEach(button=>button.addEventListener('click',()=>{
  const item=phTaskData[button.dataset.phTask]; if(!item) return;
  $$('[data-ph-task]').forEach(x=>x.classList.remove('active')); button.classList.add('active');
  const v=$('#phVisible'), h=$('#phHidden'); if(v)v.textContent=item.visible; if(h)h.textContent=item.hidden;
}));

// Make It Visible responsibility board
const visibilityForm=$('#visibilityForm'), visibilityList=$('#visibilityList');
let visibilityItems=JSON.parse(localStorage.getItem('unseen-visible-board')||'[]');
function renderVisibilityBoard(){
  if(!visibilityList)return; visibilityList.innerHTML='';
  if(!visibilityItems.length){visibilityList.innerHTML='<p class="notice">No responsibilities added yet. Add one above to make the hidden work visible.</p>';return;}
  visibilityItems.forEach((item,index)=>{
    const row=document.createElement('div'); row.className='visibility-item';
    const name=document.createElement('strong'); name.textContent=item.task;
    const owner=document.createElement('small'); owner.textContent=`Owner: ${item.owner} · Notice → Plan → Remember → Do → Follow up`;
    const del=document.createElement('button'); del.type='button'; del.textContent='Remove'; del.onclick=()=>{visibilityItems.splice(index,1);localStorage.setItem('unseen-visible-board',JSON.stringify(visibilityItems));renderVisibilityBoard();};
    row.append(name,owner,del); visibilityList.appendChild(row);
  });
}
if(visibilityForm){renderVisibilityBoard();visibilityForm.addEventListener('submit',e=>{e.preventDefault();const task=$('#visibilityTask').value.trim();const owner=$('#visibilityOwner').value;if(!task)return;visibilityItems.push({task,owner});localStorage.setItem('unseen-visible-board',JSON.stringify(visibilityItems));visibilityForm.reset();renderVisibilityBoard();});}

// Desktop sidebar: hide from inside the brand; restore from the content corner.
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarReveal = document.getElementById('sidebarReveal');
function syncSidebarToggle() {
  const collapsed = document.body.classList.contains('sidebar-collapsed');
  if (sidebarToggle) {
    sidebarToggle.setAttribute('aria-expanded', String(!collapsed));
    sidebarToggle.setAttribute('aria-label', 'Hide sidebar');
  }
  if (sidebarReveal) sidebarReveal.setAttribute('aria-expanded', String(!collapsed));
}
if (sidebarToggle && sidebarReveal) {
  if (localStorage.getItem('unseen-sidebar-collapsed') === 'true')
    document.body.classList.add('sidebar-collapsed');
  syncSidebarToggle();
  const setCollapsed = (collapsed) => {
    document.body.classList.toggle('sidebar-collapsed', collapsed);
    localStorage.setItem('unseen-sidebar-collapsed', String(collapsed));
    syncSidebarToggle();
  };
  sidebarToggle.addEventListener('click', () => setCollapsed(true));
  sidebarReveal.addEventListener('click', () => setCollapsed(false));
}
