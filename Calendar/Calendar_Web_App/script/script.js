// Returns the amount of days in a month.
const amount_of_days = (year, month) => new Date(year, month + 1, 0).getDate();

// Returns the day of the week in which the month starts.
const first_day_week_for_month = (year, month) =>
  new Date(year, month, 1).getDay();

// When given the name, it returns the month number (0-11).
function month_name_in_number(month_name) {
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
  const table_month = month_name_in_number(
    document.getElementById("month_title").innerText
  );
  return date_object(table_year, table_month);
}

// Prints year + month on the html.
function print_year_and_month(date_year, date_month) {
  const date = date_object(date_year, date_month);
  document.getElementById("year_title").innerText = date.year;
  document.getElementById("month_title").innerText = date.month_name;
}

// Creates the table.
function create_table() {
  const table = document.getElementById("days");
  // Creates 6 rows.
  for (let i = 0; i < 6; i++) {
    let current_row = table.insertRow(1 + i);
    // Creates 7 cells.
    for (let x = 0; x < 7; x++) {
      current_row.insertCell(x);
    }
  }
}

// Resets the 'td' data style properties.
function reset_table_data_style() {
  const table = document.getElementById("days");
  for (let i = 1; i < 7; i++) {
    for (let x = 0; x < 7; x++) {
      table.rows[i].cells[x].style.color = "";
      table.rows[i].cells[x].style.background = "";
      table.rows[i].cells[x].classList.remove("td");
      table.rows[i].cells[x].classList.remove("other_month");
    }
  }
}

// Changes the background color of the current month cell if it is a weekend.
const change_background_color_if_weekend = (row_number) => {
  const table = document.getElementById("days");
  if (table.rows[row_number].cells[6].classList == "td") {
    table.rows[row_number].cells[6].style.color = "lightsalmon";
  }
  if (table.rows[row_number].cells[0].classList == "td") {
    table.rows[row_number].cells[0].style.color = "lightsalmon";
  }
};

// Changes the background color of the current month cell if it is today's day.
const change_background_color_if_today = (row_number) => {
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
};

// Applies the background + today style. + loads schedules
function load_table_style() {
  for (let x = 1; x < 7; x++) {
    change_background_color_if_weekend(x);
    change_background_color_if_today(x);
  }
}

// Populates a row.
function populate_row(
  execution_number,
  row_number,
  first_cell,
  first_value,
  cell_class
) {
  if (execution_number <= 7) {
    var table = document.getElementById("days");
    for (let i = 0; i < execution_number; i++) {
      table.rows[row_number].cells[first_cell + i].innerText = first_value + i;
      table.rows[row_number].cells[first_cell + i].classList.add(cell_class);
    }
  } else {
    console.log("Alert on populate_row function.");
  }
}

// Populates the table.
function populate_table(date_year, date_month) {
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
  load_table_style();
}
function previous_month() {
  let table_date = get_table_date();
  reset_table_data_style();
  table_date.month -= 1;
  print_year_and_month(table_date.year, table_date.month);
  populate_table(table_date.year, table_date.month);
}

function current_month() {
  let table_date = get_table_date();
  reset_table_data_style();
  table_date = date_object(new Date().getFullYear(), new Date().getMonth());
  print_year_and_month(new Date().getFullYear(), new Date().getMonth());
  populate_table(new Date().getFullYear(), new Date().getMonth());
}

function next_month() {
  let table_date = get_table_date();
  reset_table_data_style();
  table_date.month += 1;
  print_year_and_month(table_date.year, table_date.month);
  populate_table(table_date.year, table_date.month);
}

function add_EL_close_button() {
  const exit_button = document.getElementById("close_pop_up");
  exit_button.addEventListener("click", close_pop_up);
}
function add_EL_confirm_button() {
  const confirm_button = document.getElementById("save_schedule");
  confirm_button.addEventListener("click", add_item);
}
function remove_EL_close_button() {
  const exit_button = document.getElementById("close_pop_up");
  exit_button.removeEventListener("click", close_pop_up);
}
function remove_EL_confirm_button() {
  const confirm_button = document.getElementById("save_schedule");
  confirm_button.removeEventListener("click", add_item);
}

function get_clicked_cell_data(row, cell, value, cell_class) {
  const cell_data = {
    row: row,
    cell: cell,
    value: value,
    cell_class: cell_class,
  };
  return cell_data;
}

function open_pop_up(row, cell, value, cell_class) {
  const cell_data = get_clicked_cell_data(row, cell, value, cell_class);
  if (cell_data.cell_class === "other_month")
    if (cell_data.value > 14) previous_month();
    else next_month();

  const pop_up = document.getElementById("add_schedule");
  const schedule_day_message = document.getElementById("schedule_top_message");
  pop_up.classList.remove("schedule_close");
  pop_up.classList.add("schedule_display");
  schedule_day_message.innerText = "New event on day " + value;
  add_EL_close_button();
  add_EL_confirm_button();
}

function close_pop_up() {
  const pop_up = document.getElementById("add_schedule");
  pop_up.classList.add("schedule_close");
  pop_up.classList.remove("schedule_display");
  remove_EL_close_button();
  remove_EL_confirm_button();
}

function add_item() {
  const input_title = document.getElementById("schedule_title");
  if (input_title.value !== "") {
    // Create
    const schedule_day = document.getElementById("schedule_day");
    const data_display = document.getElementById("data_display");
    const input_init_time = document.getElementById("schedule_initial_time");
    const input_final_time = document.getElementById("schedule_final_time");
    const input_description = document.getElementById("schedule_description");
    const data_item = document.createElement("div");
    const title_div = document.createElement("div");
    const span_title = document.createElement("span");
    const span_time = document.createElement("span");
    const description_div = document.createElement("div");
    const span_description = document.createElement("span");
    // Add class
    data_item.classList.add("data_display_item");
    title_div.classList.add("data_display_div_title");
    description_div.classList.add("data_display_div_description");
    // Append child
    data_display.appendChild(data_item);
    data_item.appendChild(title_div);
    data_item.appendChild(description_div);
    title_div.appendChild(span_title);
    title_div.appendChild(span_time);
    description_div.appendChild(span_description);
    // Values
    span_title.innerText =
      "⬤ " + schedule_day.innerText + ": " + input_title.value;
    span_time.innerText =
      input_init_time.value + " - " + input_final_time.value;
    span_description.innerText = input_description.value;
    // Clean fields
    input_title.value = "";
    input_init_time.value = "00:00";
    input_final_time.value = "23:59";
    input_description.value = "";
    close_pop_up();
    return;
  }
  input_title.style.borderBottom = "2px red solid";
}
function add_open_pop_up_button_to_cells() {
  const table = document.getElementById("days");
  for (let i = 1; i < 7; i++) {
    for (let x = 0; x < 7; x++) {
      table.rows[i].cells[x].addEventListener("click", () => {
        open_pop_up(
          i,
          x,
          table.rows[i].cells[x].innerText,
          table.rows[i].cells[x].className
        );
      });
    }
  }
}
// Loads today's data.
function main() {
  print_year_and_month(new Date().getFullYear(), new Date().getMonth());
  create_table();
  populate_table(new Date().getFullYear(), new Date().getMonth());
}

// Loads buttons.
function load_buttons() {
  const back_button = document.getElementById("back_button");
  const t_button = document.getElementById("t_button");
  const next_button = document.getElementById("next_button");

  back_button.addEventListener("click", previous_month);
  t_button.addEventListener("click", current_month);
  next_button.addEventListener("click", next_month);
  add_open_pop_up_button_to_cells();
}

// Loads main function as soon as the raw html loads.
function trigger_script() {
  document.addEventListener("DOMContentLoaded", () => {
    main();
    load_buttons();
  });
}

// Triggers the code.
trigger_script();
