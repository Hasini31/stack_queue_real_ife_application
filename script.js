// --- CONFIGURATION ---
const MAX_LIMIT = 5;
let queue = [];
let stack = [];
let idCounter = 1;
let isBusy = false; // The Lock to prevent bugs

// --- DOM REFERENCES ---
const queueContainer = document.getElementById('queue-container');
const stackContainer = document.getElementById('stack-container');
const qDisplay = document.getElementById('queue-display');
const sDisplay = document.getElementById('stack-display');
const qBar = document.getElementById('q-bar-fill');
const sBar = document.getElementById('s-bar-fill');

// --- OPERATION 1: ENQUEUE ---
function opEnqueue() {
    if (isBusy) return;

    // 1. CHECK QUEUE LIMIT
    if (queue.length >= MAX_LIMIT) {
        showError("Queue Limit", "No more plates to create order");
        return;
    }

    isBusy = true; // Lock

    // Data Logic
    let id = idCounter++;
    queue.push(id);

    // Visual Logic
    let plate = createPlateElement(id);
    // Prepend so it aligns right (FIFO entrance)
    queueContainer.prepend(plate);

    // Animation: Slide In from Right
    plate.style.opacity = '0';
    plate.style.transform = 'translateX(100px)';
    
    setTimeout(() => {
        plate.style.opacity = '1';
        plate.style.transform = 'translateX(0)';
    }, 50);

    updateStats();
    
    setTimeout(() => { isBusy = false; }, 400);
}

// --- OPERATION 2: TRANSFER (Dequeue -> Push) ---
function opTransfer() {
    if (isBusy) return;

    // 1. Check Empty Queue (UPDATED FEATURE)
    if (queue.length === 0) {
        showError("Queue Empty", "Empty no plates to transfer");
        return; 
    }

    // 2. CHECK STACK LIMIT
    if (stack.length >= MAX_LIMIT) {
        showError("Stack Overflow", "The limit of the sink is filled");
        return;
    }

    isBusy = true; // Lock

    // DATA: Remove from Queue (FIFO)
    let id = queue.shift();

    // VISUAL: Ghost Animation Logic
    let sourcePlate = document.getElementById(`plate-${id}`);
    let ghost = sourcePlate.cloneNode(true);
    let rect = sourcePlate.getBoundingClientRect();

    // Setup Ghost position
    ghost.classList.add('ghost');
    ghost.style.top = rect.top + 'px';
    ghost.style.left = rect.left + 'px';
    ghost.style.width = rect.width + 'px';
    
    document.body.appendChild(ghost);
    sourcePlate.remove(); // Gone from belt

    // Destination: Top of Sink
    let sinkRect = stackContainer.getBoundingClientRect();
    // Center in sink
    let destLeft = sinkRect.left + (sinkRect.width / 2) - 45; // 45 is half width (90/2)
    // Stack Height Logic
    let destTop = sinkRect.bottom - 40 - (stack.length * 10); 

    // Execute Trajectory
    requestAnimationFrame(() => {
        ghost.style.top = destTop + 'px';
        ghost.style.left = destLeft + 'px';
        ghost.style.transform = "rotate(0deg)";
    });

    // Finish
    setTimeout(() => {
        // DATA: Add to Stack (LIFO)
        stack.push(id);

        let finalPlate = createPlateElement(id);
        stackContainer.appendChild(finalPlate); // Flex-col-reverse handles stacking
        
        ghost.remove();
        updateStats();
        isBusy = false;
    }, 700);
}

// --- OPERATION 3: POP ---
function opPop() {
    if (isBusy) return;
    
    // 1. Check Empty Stack (UPDATED FEATURE)
    if (stack.length === 0) {
        showError("Stack Empty", "Empty no plates left in the sink");
        return;
    }

    isBusy = true;

    // DATA: Remove
    let id = stack.pop();

    // VISUAL: Remove
    let plate = stackContainer.lastElementChild;

    // Animation: Fly Up
    plate.style.transition = "all 0.5s ease";
    plate.style.transform = "translateY(-150px) scale(0.5) rotate(180deg)";
    plate.style.opacity = '0';

    setTimeout(() => {
        plate.remove();
        updateStats();
        isBusy = false;
    }, 500);
}

// --- HELPERS ---
function createPlateElement(id) {
    let div = document.createElement('div');
    // Randomize color class c1, c2, or c3
    let colorClass = `c${(id % 3) + 1}`;
    div.className = `plate ${colorClass}`;
    div.id = `plate-${id}`;
    div.setAttribute('data-id', id);
    return div;
}

function updateStats() {
    // Update Text
    qDisplay.innerText = `${queue.length} / ${MAX_LIMIT}`;
    sDisplay.innerText = `${stack.length} / ${MAX_LIMIT}`;

    // Update Bars
    qBar.style.width = `${(queue.length / MAX_LIMIT) * 100}%`;
    sBar.style.width = `${(stack.length / MAX_LIMIT) * 100}%`;

    // Color logic
    if (queue.length === MAX_LIMIT) qBar.style.backgroundColor = '#ef4444';
    else qBar.style.backgroundColor = '#22c55e';

    if (stack.length === MAX_LIMIT) sBar.style.backgroundColor = '#ef4444';
    else sBar.style.backgroundColor = '#22c55e';
}

// --- MODAL LOGIC ---
const modal = document.getElementById('modal-overlay');
const mTitle = document.getElementById('modal-title');
const mMsg = document.getElementById('modal-msg');

function showError(title, msg) {
    mTitle.innerText = title;
    mMsg.innerText = msg;
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}