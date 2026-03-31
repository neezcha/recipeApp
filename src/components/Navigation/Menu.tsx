import React, { useState} from "react"
import { Button, Heading, Flex, DropdownMenu } from '@radix-ui/themes'
import { Half2Icon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useAppState } from "../../app-state"
import { useNavigate } from "react-router"
import { navMenuItemArray } from "../../const"


const NavMenu : React.FC = () => {    
    const appState = useAppState();
    const navigate = useNavigate();

    const [theme, setTheme] = useState('light');
    const [curModeIcon, setModeIcon] = useState(<SunIcon/>);
    const setThemeMode = (mode: string) => {
        switch(mode) {
            case 'system':
                appState.setUseSystemTheme(matchMedia('prefers-color-scheme: dark').matches);
                setModeIcon(<Half2Icon/>);
                break;
            case 'dark':
                appState.setDarkTheme(true);
                setModeIcon(<MoonIcon/>);
                break;
            default:
                appState.setDarkTheme(false);
                setModeIcon(<SunIcon/>);
                break;
          }
    }

    return <>
        <div id="navMENU">
            <Flex as="span" align="center" justify="between" gap="4" p="3">
                <Flex justify="start" gap="3">
                    <Heading as="h1" color={'cyan'}>The Menu </Heading>
                </Flex>
                <Flex justify="center" gap="3">
                    {navMenuItemArray.map(element =>{
                        return(
                        <Button 
                            className="pointer mr4"
                            variant="surface"
                            /* onClick={()=> setDestination(element.dest)} */
                            /* onClick={()=>  navigate('all-recipies') } */
                            onClick={()=> navigate(element.route) }
                            key={element.dest}>
                            {element.title} 
                        </Button>

                    )})}
                </Flex>
                <Flex justify="end" gap="3">
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button color="gray" variant="soft"> 
                                {curModeIcon}
                            </Button>
                        </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
                                    <DropdownMenu.RadioItem value={'light'} onClick={()=>{setThemeMode('light')}}>
                                    <SunIcon/>
                                    Light
                                </DropdownMenu.RadioItem>
                                <DropdownMenu.RadioItem value={'dark'} onClick={()=>{setThemeMode('dark')}}>
                                    <MoonIcon/>
                                    Dark
                                </DropdownMenu.RadioItem>
                                <DropdownMenu.RadioItem value={'system'} onClick={()=>{setThemeMode('system')}}>
                                    <Half2Icon/>
                                    System 
                                </DropdownMenu.RadioItem>
                                </DropdownMenu.RadioGroup>
                            </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
            </Flex>
        </div>
    </>;
}


export default NavMenu;