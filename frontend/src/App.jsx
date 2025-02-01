
import AppRoute from "./routes/AppRoute"
import { UserProvider } from "./context/user.context"

function App() {
  

  return (
    <UserProvider>
      <AppRoute />
    </UserProvider>
    
  )
}

export default App
