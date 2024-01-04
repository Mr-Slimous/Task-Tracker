// Selecting DOM elements
const confirmEl = document.querySelector(".confirm"),
  closeEl = document.querySelector(".close"),
  title = document.querySelector(".title"),
  content = document.querySelector(".content"),
  btnOk = document.querySelector(".btn-ok"),
  btnCancel = document.querySelector(".btn-cancel");

// Custom Confirm Box class
class ShowConfirm {
  // Constructor to initialize title, content, and button labels
  constructor(title, content, ok, cancel) {
    this.title = title;
    this.content = content;
    this.ok = ok;
    this.cancel = cancel;
  }

  // Show confirm box
  trigger(callbackFn) {
    // Set content and labels
    title.textContent = this.title;
    content.textContent = this.content;
    btnOk.innerText = this.ok;
    btnCancel.innerText = this.cancel;

    // Display the confirm box
    confirmEl.classList.remove("close-modal");

    // Event listeners for close and cancel actions
    closeEl.addEventListener("click", this.closeModal);
    btnCancel.addEventListener("click", this.closeModal);

    // Event listener for OK action
    btnOk.addEventListener("click", () => {
      // Execute callback function and close modal
      callbackFn();
      this.closeModal();
    });
  }

  // Close Modal Method
  closeModal() {
    confirmEl.classList.add("close-modal");
  }
}

// Create instances for different confirm boxes
const deleteThisTask = new ShowConfirm(
  "Delete Task",
  "You are about to delete a task!",
  "Delete",
  "Cancel"
);

const deleteAllTasks = new ShowConfirm(
  "Delete all Tasks",
  "You are about to delete all tasks!",
  "Delete",
  "Cancel"
);

