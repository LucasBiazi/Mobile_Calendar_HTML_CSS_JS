// Returns the amount of days in a month.
const amount_of_days = (year, month) => new Date(year, month + 1, 0).getDate();

const first_day_week_for_month = (year, month) =>
  new Date(year, month, 1).getDay();

// Returns current date object with more properties.
const get_date = (date_year, date_month) => {
  const month_names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date_object = new Date(date_year, date_month);
  const date = {
    year: date_object.getFullYear(),
    month: date_object.getMonth(),
    month_name: month_names[date_object.getMonth()],
    amount_of_days: amount_of_days(
      date_object.getFullYear(),
      date_object.getMonth()
    ),
    day_of_the_week_in_which_the_month_begins: first_day_week_for_month(
      date_object.getFullYear(),
      date_object.getMonth()
    ),
  };
  return date;
};

// Prints year + month on the html after 1 milisecond..
function print_year_and_month(date_year, date_month) {
  setTimeout(() => {
    const date = get_date(date_year, date_month);
    document.getElementById("year_title").textContent = date.year;
    document.getElementById("month_title").textContent = date.month_name;
  }, 1);
}

// Creates the table after 1 milisecond.
function create_table() {
  setTimeout(() => {
    const table = document.getElementById("days");
    // Creates 6 rows.
    for (let i = 0; i < 6; i++) {
      let current_row = table.insertRow(1 + i);
      // Creates 7 cells.
      for (let x = 0; x < 7; x++) {
        current_row.insertCell(x);
      }
    }
  }, 1);
}

// Clean all data on the table, then create it again.
function reset_table() {
  const table = document.getElementById("days");
  for (let i = 0; i < 6; i++) {
    table.deleteRow(1 + i);
  }
  create_table();
}

// Run through a specific row, and all its cells.
function populate_row(row_number, starting_cell, cell_value, class_name) {
  setTimeout(() => {
    const table = document.getElementById("days");
    for (let i = 0; i < table.rows[row_number].cells.length; i++) {
      table.rows[row_number].cells[starting_cell].textContent = cell_value;
      table.rows[row_number].cells[starting_cell].classList.add(class_name);
    }
  }, 1);
}

// Populates the table. AD = Amount of days. AC = Amount of cells.
function populate_table(date_year, date_month) {
  setTimeout(() => {
    const date = get_date(date_year, date_month);
    const AC_current_month = 7 - date.day_of_the_week_in_which_the_month_begins;
    const AC_last_month = 7 - AC_current_month;
    let AD_last_month = get_date(date.year, date.month - 1).amount_of_days;
    let day_counter = 1;

    // first row.
    for (let i = 0; i < AC_last_month; i++) {
      populate_row(1, AC_last_month - i - 1, AD_last_month - i, "other_month");
    }
    for (i = 0; i < AC_current_month; i++) {
      populate_row(1, 7 - i - 1, AC_current_month - i, "td");
      day_counter++;
    }

    // For the rest of them.
    for (i = 2; i < 7; i++) {
      
    }
  }, 1);
}

function main() {
  print_year_and_month(new Date().getFullYear(), new Date().getMonth());
  create_table();
  populate_table(new Date().getFullYear(), new Date().getMonth());
}

// Loads main function as soon as the page loads.
function trigger_script() {
  if (document.readyState !== "loading") {
    main();
  } else {
    document.addEventListener("DOMContentLoaded", main());
  }
}

trigger_script();
