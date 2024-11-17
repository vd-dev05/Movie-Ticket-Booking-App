import * as Yup from "yup"

const YupValid = {
    nameValidation :  Yup.string()
    .required("Required  name")
    .min(4, "Name must be 4 characters or more"),
    phoneValidation : Yup.string()
    .required('Phone is required')
    .matches(
        /^(?:\+?\d{1,3})?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/,
        'Phone number is not valid'
    ),
    passwordValidation : Yup.string()
    .required("Required password")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
      "Password must be 7-19 characters and contain at least one letter, one number, and a special character"
    ),
    confirmPasswordValidation : Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    emailValidation : Yup.string()
    .email("Invalid email format @example.com ")
    .matches(/^\S+@\S+\.\S+$/, "Email can not space characters")
    .required("Required email")


}
export default YupValid