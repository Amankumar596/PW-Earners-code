function getElementById(id) {
  return document.getElementById(id);
}

const addMemberForm = getElementById("add-member-form");
let p = getElementById("member-error-msg");

const MEMBERS_LOCALSTORAGE_KEY = "members";
const BADGE_COLORS = ["#2F6B4F", "#3D5A80", "#8C5E58", "#6A7B76"];

let allMembers = getItems(MEMBERS_LOCALSTORAGE_KEY);

function getItems(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function setItems(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

function getRandomBadgeColor() {
  let randomIndex = Math.floor(Math.random() * BADGE_COLORS.length);
  return BADGE_COLORS[randomIndex];
}

addMemberForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = getElementById("member-name-input").value.trim();
  p.classList.add("hidden");
  if (!value) {
    p.textContent = "Please enter a name.";
    p.classList.remove("hidden");
    return;
  }

  const isMemberAlreadyExist = allMembers.some(
    ({ name }) => name.toLowerCase() === value.toLowerCase(),
  );
  if (isMemberAlreadyExist) {
    p.textContent = "A member with this name already exists.";
    p.classList.remove("hidden");
    return;
  }

  allMembers = [...allMembers, { name: value, id: `mem_${Date.now()}` }];
  console.log(allMembers);
  setItems(MEMBERS_LOCALSTORAGE_KEY, allMembers);

  getElementById("member-name-input").value = "";
  renderAll();
});

function renderMembers() {
  const membersList = getElementById("members-list");
  membersList.innerHTML = "";

  getElementById("members-count").textContent = `${allMembers.length} members`;

  if (!allMembers.length) {
    getElementById("members-empty").classList.remove("hidden");
    membersList.classList.add("hidden");
    return;
  }

  getElementById("members-empty").classList.add("hidden");
  membersList.classList.remove("hidden");

  allMembers.forEach(({ id, name }) => {
    let li = document.createElement("li");
    li.innerHTML = `
    <li class="flex items-center justify-between py-2.5 px-1 hover:bg-slate-100/50 transition-colors gap-2">
                <div class="flex items-center gap-3 min-w-0 flex-1">
                  <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-medium text-white shrink-0 select-none" style="background-color: #2F6B4F;">
                    ${name[0].toUpperCase()}
                  </span>
                  <span class="font-sans text-sm font-medium text-ledger-ink truncate break-words">${name}</span>
                </div>
                <button type="button" class="remove-member-btn text-ledger-muted hover:text-ledger-rust p-2 rounded-sm transition-colors cursor-pointer shrink-0 ml-2 min-w-[36px] min-h-[36px] flex items-center justify-center" data-id=${id} title="Remove ram" aria-label="Remove ram">
                  <svg class="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
    `;

    membersList.append(li);
  });

  console.log("asdads");
  membersList.addEventListener("click", (e) => {
    e.stopPropagation();
    const remMemBtn = e.target.closest(".remove-member-btn");
    if (remMemBtn) {
      const id = remMemBtn.dataset.id;
      allMembers = allMembers.filter(({ id: memId }) => memId !== id);
      setItems(MEMBERS_LOCALSTORAGE_KEY, allMembers);
      renderAll();
    }
  });
}

const expenseMembersWarning = getElementById("expense-members-warning");
const addExpenseForm = getElementById("add-expense-form");

function renderAddExpense() {
  if (allMembers.length < 2) {
    expenseMembersWarning.classList.remove("hidden");
    addExpenseForm.classList.add("hidden");
  } else {
    expenseMembersWarning.classList.add("hidden");
    addExpenseForm.classList.remove("hidden");
  }

  let expensePayerSelect = getElementById("expense-payer-select");
  let splitMembersContainer = getElementById("split-members-container");
  expensePayerSelect.innerHTML = "";
  splitMembersContainer.innerHTML = "";

  allMembers.forEach(({ id, name }) => {
    let option = document.createElement("option");
    option.value = id;
    option.textContent = name;
    expensePayerSelect.append(option);

    let label = document.createElement("label");
    label.className =
      "flex items-center gap-2.5 text-xs font-sans text-ledger-ink cursor-pointer hover:bg-slate-100/60 px-2 py-2 rounded-sm select-none border border-transparent hover:border-ledger-border transition-colors min-h-[36px]";

    label.innerHTML = `<input type="checkbox" value=${id} class="split-member-checkbox rounded-sm text-ledger-forest accent-[#2F6B4F] cursor-pointer w-4 h-4 shrink-0" checked>
                  <span class="truncate break-all min-w-0">${name}</span>`;
    splitMembersContainer.append(label);
  });
}

function renderAll() {
  p.classList.add("hidden");
  renderMembers();
  renderAddExpense();
}

renderAll();
