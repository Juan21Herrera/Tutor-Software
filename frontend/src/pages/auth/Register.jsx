import RegisterForm from '../../components/Auth/RegisterForm';

export default function Register() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      

      <div className="backdrop-blur-[20px] bg-white/30 p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <RegisterForm />
      </div>
    </div>
  );
}