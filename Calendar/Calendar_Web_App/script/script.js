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

const change_background_color_if_weekend = (row_number) => {
  const table = document.getElementById("days");
  table.rows[row_number].cells[0].style.color = "lightsalmon";
  table.rows[row_number].cells[6].style.color = "lightsalmon";
};

// Run through a specific row, and x amount of cells.
function populate_row(
  row_number,
  AC_filled,
  first_cell,
  first_value,
  cell_class
) {
  setTimeout(() => {
    const table = document.getElementById("days");
    for (let i = 0; i < AC_filled; i++) {
      table.rows[row_number].cells[first_cell + i].textContent =
        first_value + i;
      table.rows[row_number].cells[first_cell + i].classList.add(cell_class);
    }
  }, 1);
}

// Populates the table. AD = Amount of days. AC = Amount of cells.
function populate_table(date_year, date_month) {
  setTimeout(() => {
    const date = get_date(date_year, date_month);
    const total_AC = 42;
    const AC_CM_1_row = 7 - date.day_of_the_week_in_which_the_month_begins;
    const AC_last_month = 7 - AC_CM_1_row;
    let AD_last_month = amount_of_days(date.year, date.month - 1);
    let AD_counter = 0;
    let AD_next_month = total_AC - date.amount_of_days - AC_last_month;

    // Populates 1 cell.
    populate_row(
      1,
      AC_last_month,
      0,
      AD_last_month - AC_last_month + 1,
      "other_month"
    );
    populate_row(1, AC_CM_1_row, AC_CM_1_row + 1, 1, "td");
    change_background_color_if_weekend(1);
    AD_counter += AC_CM_1_row;

    // Populates the rest.
    for (i = 0; i < 5; i++) {
      if (AD_counter <= date.amount_of_days - AC_CM_1_row) {
        populate_row(2 + i, 7, 0, AD_counter + 1, "td");
        change_background_color_if_weekend(2 + i);
        AD_counter += 7;
      }
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
