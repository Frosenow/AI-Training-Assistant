export function validateRegisterInput(
  username,
  email,
  password,
  confirmPassword
) {
  const errors = {};
  // if username is empty
  if (username.trim() === "") {
    errors.username = "Username cannot be empty";
  }

  // if email is empty
  if (email.trim() === "") {
    email.username = "Email cannot be empty";
  } else {
    const emailValidation = new RegExp(
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    );
    if (!email.match(emailValidation)) {
      errors.email = "Email must be a valid email address";
    }
  }

  // if password is empty or is not matching confirmPassword
  if (password === "") {
    errors.password = "Password cannot be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    // Check if there are any errors
    valid: Object.keys(errors).length < 1,
  };
}

export function validateLoginInput(username, password) {
  const errors = {};

  // if username is empty
  if (username.trim() === "") {
    errors.username = "Username cannot be empty";
  }
  // if password is empty
  if (password.trim() === "") {
    errors.password = "Password cannot be empty";
  }

  return {
    errors,
    // Check if there are any errors
    valid: Object.keys(errors).length < 1,
  };
}

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export function validateExercise(exerciseObj) {
  const errors = {};

  // Check for empty string
  if (exerciseObj.exerciseDay.trim() === "") {
    errors.exerciseDay = "Day of the week field cannot be empty";
  }

  // Check for non-existing day of the week
  if (!days.includes(exerciseObj.exerciseDay.toLowerCase())) {
    errors.exerciseDay = "Incorrect day of the week";
  }

  if (exerciseObj.exerciseName.trim() === "") {
    errors.exerciseName = "Exercise name field cannot be empty";
  }

  if (exerciseObj.muscleGroup.trim() === "") {
    errors.muscleGroup = "Muscle group field cannot be empty";
  }

  if (!Number.isInteger(exerciseObj.sets)) {
    errors.sets = "Sets number must be an integer";
  }

  const checkIfInteger = (array) =>
    array.every((element) => Number.isInteger(element));

  if (!checkIfInteger(exerciseObj.reps)) {
    errors.reps = "Each rep number must be an integer";
  }

  return {
    errors,
    // Check if there are any errors
    valid: Object.keys(errors).length < 1,
  };
}
