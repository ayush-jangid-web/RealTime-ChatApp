import React from 'react'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

const App = () => {
  return (
    <div><h1>hello</h1>
    
    <header>
        <Show when="signed-out">
          <SignInButton mode='modal' />
          <SignUpButton mode='modal' />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    
    </div>
  )
}

export default App