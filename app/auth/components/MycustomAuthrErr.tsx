import { LoginForm } from "app/auth/components/LoginForm"

const MycustomAuthrErr = ({ onSuccess }) => {
  return (
    <div className="flex h-screen -my-16">
      <div className="m-auto">
        <LoginForm onSuccess={onSuccess} />
      </div>
    </div>
  )
}

export default MycustomAuthrErr
