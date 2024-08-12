"use client"

import { ActionResult } from '@/types'
import React from 'react'
import { useFormState } from 'react-dom'
import {Logout} from '../lib/action'

export default function LogoutBtn() {

    const initialState : ActionResult = {
        error: ''
    }

    const [state, formAction] = useFormState(Logout, initialState)
  return (
    <form action={formAction}>
        <button>
            Logout
        </button>
    </form>
  )
}
