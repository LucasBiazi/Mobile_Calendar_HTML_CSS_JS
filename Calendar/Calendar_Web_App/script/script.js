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
  }, 2);
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
  }, 2);
}

// Populates the table. AD = Amount of days. AC = Amount of cells.
function populate_table(date_year, date_month) {
  setTimeout(() => {
    const table = document.getElementById("days");
    const date = date_object(date_year, date_month);
    const AC_CM_1_row = 7 - date.day_of_the_week_in_which_the_month_begins;
    const AC_last_month = 7 - AC_CM_1_row;
    let AC_next_month = 42 - date.amount_of_days - AC_last_month;
    let AD_last_month = amount_of_days(date.year, date.month - 1);
    let day_counter = AC_CM_1_row;
    // 1 row
    if (AC_CM_1_row < 7) {
      populate_row(
        7 - AC_CM_1_row,
        1,
        0,
        AD_last_month - AC_CM_1_row,
        "other_month"
      );
    }
    populate_row(
      AC_CM_1_row,
      1,
      date.day_of_the_week_in_which_the_month_begins,
      1,
      "td"
    );
    // other rows
    let i = 2;
    while (day_counter < date.amount_of_days) {
      populate_row(7, i, 0, day_counter + 1, "td");
      day_counter += 7;
      i++;
      if (
        date.amount_of_days - day_counter <= 7 &&
        date.amount_of_days - day_counter !== 0
      ) {
        console.log("in");
        populate_row(
          date.amount_of_days - day_counter,
          i,
          0,
          day_counter + 1,
          "td"
        );
        if (i === 5 || i === 6) {
          console.log("in " + AC_next_month);
          while (AC_next_month !== 0) {
            populate_row(
              7 - (date.amount_of_days - day_counter),
              i,
              date.amount_of_days - day_counter,
              1,
              "other_month"
            );
            AC_next_month -= 7 - (date.amount_of_days - day_counter);
            if (AC_next_month > 0) {
              populate_row(
                7,
                i + 1,
                0,
                1 + (7 - (date.amount_of_days - day_counter)),
                "other_month"
              );
              AC_next_month -= 7;
            }
          }
        }
        day_counter = date.amount_of_days;
      }
    }
    for (let x = 1; x < 7; x++) change_background_color_if_weekend(x);
  }, 1);
}

function main() {
  print_year_and_month(new Date().getFullYear(), new Date().getMonth());
  create_table();
  populate_table(new Date().getFullYear(), 10);
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
