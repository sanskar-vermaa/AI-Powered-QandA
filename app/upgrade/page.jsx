import React from 'react'
import Header from '../dashboard/_components/Header'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  

function upgrade() {
  return (
    
    <div>
        <div>
        <Header/>
        </div>

        <div className='grid grid-cols-2 gap-4 justify-between'>

            <div>
                            <Card className="w-[380px]">
                            <CardHeader>
                                <CardTitle>Card Title</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Card Content</p>
                            </CardContent>
                            <CardFooter>
                                <p>Card Footer</p>
                            </CardFooter>
                    </Card>
            </div>
            <div>

                    <Card className="w-[380px]">
                            <CardHeader>
                                <CardTitle>Card Title</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Card Content</p>
                            </CardContent>
                            <CardFooter>
                                <p>Card Footer</p>
                            </CardFooter>
                    </Card>
            </div>
       

        </div>

    </div>

    
  )
}

export default upgrade