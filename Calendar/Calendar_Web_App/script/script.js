// Returns the amount of days in a month.
const amount_of_days = (year, month) => new Date(year, month + 1, 0).getDate();

// Day of the week in which the month starts.
const first_day_week_for_month = (year, month) =>
  new Date(year, month, 1).getDay();

// When given the name, it returns the month number (0-11).
function month_convertion(month_name) {
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
  for (let i = 0; i < 12; i++) {
    return month_names.indexOf(month_name);
  }
}

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
    get_first_Day: first_day_week_for_month(
      date_object.getFullYear(),
      date_object.getMonth()
    ),
  };
  return date;
};

// Returns a date object based on the table data.
function get_table_date() {
  const table_year = parseInt(document.getElementById("year_title").innerText);
  const table_month = month_convertion(
    document.getElementById("month_title").innerText
  );
  return date_object(table_year, table_month);
}

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

// Resets all table data style properties.
function reset_table_data_style() {
  setTimeout(() => {
    const table = document.getElementById("days");
    for (let i = 1; i < 7; i++) {
      for (let x = 0; x < 7; x++) {
        table.rows[i].cells[x].style.color = "";
        table.rows[i].cells[x].style.background = "";
        table.rows[i].cells[x].classList.remove("td");
        table.rows[i].cells[x].classList.remove("other_month");
      }
    }
  }, 2);
}

// Changes the background color of the current month cell if it is a weekend.
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

// Changes the background color of the current month cell if it is today's day.
const change_background_color_if_today = (row_number) => {
  setTimeout(() => {
    const table = document.getElementById("days");
    const table_date_object = get_table_date();
    if (
      table_date_object.year === new Date().getFullYear() &&
      table_date_object.month === new Date().getMonth()
    ) {
      for (let i = 0; i < 7; i++) {
        if (
          table.rows[row_number].cells[i].innerText == new Date().getDate() &&
          table.rows[row_number].cells[i].className === "td"
        ) {
          table.rows[row_number].cells[i].style.background = "black";
        }
      }
    } else {
      return;
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

// Populates the table.
function populate_table(date_year, date_month) {
  setTimeout(() => {
    // AD = Amount of Days. AC = Amount of cells. CM = Current Month.
    const date = date_object(date_year, date_month);
    const AC_CM_1_row = 7 - date.get_first_Day;
    const AC_last_month = 7 - AC_CM_1_row;
    const AD_last_month = amount_of_days(date.year, date.month - 1);
    let AD_next_month = 42 - date.amount_of_days - AC_last_month;
    let day_counter = AC_CM_1_row;
    let lasting_days = date.amount_of_days - day_counter;

    // Populates the first row.
    if (AC_CM_1_row < 7) {
      populate_row(
        7 - AC_CM_1_row,
        1,
        0,
        AD_last_month - (7 - AC_CM_1_row) + 1,
        "other_month"
      );
    }
    populate_row(AC_CM_1_row, 1, date.get_first_Day, 1, "td");

    // Populates the other rows.
    let i = 2;
    while (day_counter < date.amount_of_days) {
      populate_row(7, i, 0, day_counter + 1, "td");
      day_counter += 7;
      lasting_days = date.amount_of_days - day_counter;
      i++;
      // If lasting days won't fill a whole row, fill the rest of the table.
      if (lasting_days <= 7 && lasting_days !== 0) {
        populate_row(lasting_days, i, 0, day_counter + 1, "td");
        while (AD_next_month !== 0) {
          populate_row(7 - lasting_days, i, lasting_days, 1, "other_month");
          AD_next_month -= 7 - lasting_days;
          if (AD_next_month > 0) {
            populate_row(7, i + 1, 0, 1 + (7 - lasting_days), "other_month");
            AD_next_month -= 7;
          }
        }
        day_counter = date.amount_of_days;
      }
    }
    for (let x = 1; x < 7; x++) {
      change_background_color_if_weekend(x);
      change_background_color_if_today(x);
    }
  }, 1);
}

function main() {
  print_year_and_month(new Date().getFullYear(), new Date().getMonth());
  create_table();
  populate_table(new Date().getFullYear(), new Date().getMonth());
}

function load_buttons() {
  setTimeout(() => {
    const back_button = document.getElementById("back_button");
    const t_button = document.getElementById("t_button");
    const next_button = document.getElementById("next_button");    

    back_button.addEventListener("click", () => {
      let table_date = get_table_date();
      reset_table_data_style();
      table_date.month -= 1;
      populate_table(table_date.year, table_date.month);
      print_year_and_month(table_date.year, table_date.month);
    });
    t_button.addEventListener("click", () => {
      reset_table_data_style();
      populate_table(new Date().getFullYear(), new Date().getMonth());
      print_year_and_month(new Date().getFullYear(), new Date().getMonth());
      table_date = date_object(new Date().getFullYear(), new Date().getMonth());
    });
    next_button.addEventListener("click", () => {
      let table_date = get_table_date();
      reset_table_data_style();
      table_date.month += 1;
      populate_table(table_date.year, table_date.month);
      print_year_and_month(table_date.year, table_date.month);
    });
  }, 20);
}

// Loads main function as soon as the page loads.
function trigger_script() {
  if (document.readyState !== "loading") {
    main();
    load_buttons();
  } else {
    document.addEventListener("DOMContentLoaded", main(), load_buttons());
  }
}

trigger_script();
