import React from "react";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";

import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="w-full h-[90vh] flex items-center justify-center bg-neutral-900 ">
            <Card className="w-full max-w-md bg-transparent text-white">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Get Started With Us!!
                    </CardTitle>
                    <CardDescription>
                        Create your account to get started or Login
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center
                 items-center gap-4">
                    <Button className="w-1/2 bg-white" asChild>
                        <Link to="/signup">Sign Up</Link>
                    </Button>
                    <Button className="w-1/2" asChild>
                        <Link to="/login">Login</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default HomePage;
