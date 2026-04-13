export const isValidEmail = (email) => {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

export const isValidPassword = (password) => {
  return typeof password === "string" && password.trim().length >= 6;
};

export const isValidUsername = (username) => {
  return typeof username === "string" && username.trim().length >= 3;
};

export const validateAuthInputs = (authState, authData) => {
  const { username, email, password } = authData;

  if (authState === "Sign up" && !isValidUsername(username)) {
    return "Username must be at least 3 characters.";
  }

  if (!isValidEmail(email)) {
    return "Please enter a valid email address.";
  }

  if (!isValidPassword(password)) {
    return "Password must be at least 6 characters.";
  }

  return null;
};

export const validateOtpInput = (code) => {
  if (typeof code !== "string" || !/^\d{6}$/.test(code.trim())) {
    return "Please enter a valid 6-digit verification code.";
  }
  return null;
};

export const isValidCourseTitle = (title) => {
  return typeof title === "string" && title.trim().length >= 10;
};

export const isValidCourseDescription = (description) => {
  return typeof description === "string" && description.trim().length >= 30;
};

export const isValidCourseImage = (file) => {
  return file instanceof File && file.type.startsWith("image/");
};

export const validateCourseInputs = ({ courseTitle, courseDescription, courseImage }) => {

  if (!courseTitle) {
    return "Course title is required.";
  } else if (!isValidCourseTitle(courseTitle)) {
    return "Title must be at least 10 characters.";
  }

  if (!courseDescription) {
    return "Course description is required.";
  } else if (!isValidCourseDescription(courseDescription)) {
    return "Description must be at least 30 characters.";
  }

  if (!courseImage) {
    return "Course thumbnail is required.";
  } else if (!isValidCourseImage(courseImage)) {
    return "Please select a valid image file.";
  }

  return null;
};
