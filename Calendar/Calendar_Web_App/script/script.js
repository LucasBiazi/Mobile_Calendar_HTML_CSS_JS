// Returns the amount of days in a month.
const amount_of_days = (year, month) => new Date(year, month + 1, 0).getDate();

// Day of the week in which the month starts.
const first_day_week_for_month = (year, month) =>
  new Date(year, month, 1).getDay();

// Returns a date object, with more properties.
const date_object = (date_year, date_month) => {
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

// Prints year + month on the html.
function print_year_and_month(date_year, date_month) {
  setTimeout(() => {
    const date = date_object(date_year, date_month);
    document.getElementById("year_title").innerText = date.year;
    document.getElementById("month_title").innerText = date.month_name;
  }, 1);
}

// Creates the table.
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

// Delete the last 6 rows.
function reset_table() {
  setTimeout(() => {
    const table = document.getElementById("days");
    for (let i = 0; i < 6; i++) {
      table.deleteRow(1);
    }
  }, 1);
}

const change_background_color_if_weekend = (row_number) => {
  setTimeout(() => {
    const table = document.getElementById("days");
    if (table.rows[row_number].cells[6].classList == "td") {
      table.rows[row_number].cells[6].style.color = "lightsalmon";
    }
    if (table.rows[row_number].cells[0].classList == "td") {
      table.rows[row_number].cells[0].style.color = "lightsalmon";
    }
  }, 15);
};

// Run through a specific row, and x amount of cells.
function populate_row(
  execution_number,
  row_number,
  first_cell,
  first_value,
  cell_class
) {
  setTimeout(() => {
    if (execution_number <= 7) {
      var table = document.getElementById("days");
      for (let i = 0; i < execution_number; i++) {
        table.rows[row_number].cells[first_cell + i].innerText =
          first_value + i;
        table.rows[row_number].cells[first_cell + i].classList.add(cell_class);
      }
    } else {
      console.log("Alert on populate_row function.");
    }
  }, 10);
}

// Populates the table. AD = Amount of days. AC = Amount of cells.
function populate_table(date_year, date_month) {
  setTimeout(() => {
    const table = document.getElementById("days");
    const date = date_object(date_year, date_month);
    const AC_CM_1_row = 7 - date.day_of_the_week_in_which_the_month_begins;
    const AC_last_month = 7 - AC_CM_1_row;
    const AC_next_month = 42 - date.amount_of_days - AC_last_month;
    let AD_last_month = amount_of_days(date.year, date.month - 1);
    let day_counter = AC_CM_1_row;
    // 1 row
    populate_row(
      AC_CM_1_row,
      1,
      date.day_of_the_week_in_which_the_month_begins,
      1,
      "td"
    );
    change_background_color_if_weekend(1);
    // other rows
    for (let i = 2; i < 5; i++) {
      populate_row(7, i, 0, day_counter + 1, "td");
      change_background_color_if_weekend(i);
      day_counter += 7;
    }

    if (day_counter < date.amount_of_days) {
      if (date.amount_of_days - day_counter <= 7) {
        populate_row(
          date.amount_of_days - day_counter,
          5,
          0,
          day_counter + 1,
          "td"
        );
        day_counter += date.amount_of_days - day_counter;
        change_background_color_if_weekend(5);
        console.log(day_counter);
      } else {
        populate_row(
          7,
          5,
          0,
          day_counter + 1,
          "td"
        );
        day_counter += date.amount_of_days - day_counter;
        change_background_color_if_weekend(5);
        console.log(day_counter);
      }
    }
  }, 1);
}

function main() {
  print_year_and_month(new Date().getFullYear(), new Date().getMonth());
  create_table();
  populate_table(new Date().getFullYear() + 1, 0);
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
