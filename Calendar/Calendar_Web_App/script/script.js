// Returns date object with more properties
const get_date = () => {
  const amount_of_days = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const first_day_week_for_month = (year, month) =>
    new Date(year, month, 1).getDay();

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

  const date_object = new Date();
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


function print_month_days() {
  get_date();
}

// Loads print_month_days function as soon as the page loads.
function trigger_script() {
  if (document.readyState !== "loading") {
    print_month_days();
  } else {
    document.addEventListener("DOMContentLoaded", print_month_days());
  }
}

trigger_script();
