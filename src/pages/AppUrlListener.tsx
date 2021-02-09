import { useEffect } from "react"
import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {Plugins} from '@capacitor/core'
const { App: CapApp } = Plugins

const AppUrlListener: React.FC<any> = () => {
    let history = useHistory();
    useEffect(() => {
        CapApp.addListener('appUrlOpen', (data:any)=> {
            const slug = data.url.split('.app').pop();
            if (slug) {
                history.push(slug);
            }
        })
        
    }, [])
    return null
}

export default AppUrlListener