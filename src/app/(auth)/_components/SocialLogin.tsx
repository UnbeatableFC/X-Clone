import React from 'react'
import { Button } from '@/components/ui/button'
import GoogleLogo from '../../../../public/assets/google-font.svg'
import { doSocialLogin } from '@/app/actions/auth.action'

const SocialLogin = () => {
  return (
    <form action={doSocialLogin}>
        <Button variant='outline' className='shadow-sm dark:bg-white gap-2 h-10 w-full text-base !text-[#3c4043] font-medium p-1 rounded-full' type='submit' name='action' value='google'>
            <GoogleLogo /> 
            Sign In With Google
        </Button>
    </form>
  )
}

export default SocialLogin
