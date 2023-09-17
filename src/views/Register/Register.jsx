import InputGroup from "../../components/InputGroup/InputGroup";
import { useFormik } from "formik";
import { registerSchema } from '../../utils/yup.schemas';
import { register } from '../../services/AuthService';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
    setSubmitting,
    setFieldError,
  } = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      register(values)
        .then(() => {
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          setFieldError('email', err.response.data.message);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return user ? (
    <Navigate to="/profile" />
  ) : (
    <div className="Register">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <InputGroup
          label="Name"
          name="name"
          type="text"
          value={values.name}
          error={touched.name && errors.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your name"
        />
        <InputGroup
          label="Email"
          name="email"
          type="email"
          value={values.email}
          error={touched.email && errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your email"
        />
        <InputGroup
          label="Password"
          name="password"
          type="password"
          value={values.password}
          error={touched.password && errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your password"
        />

        <button type="submit" className={`btn btn-${isSubmitting ? 'secondary' : 'primary'}`}>
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
