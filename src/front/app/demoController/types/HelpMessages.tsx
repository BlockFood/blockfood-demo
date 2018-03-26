import * as React from 'react'

export const enum HELP_MESSAGES {
    START_AS_CUSTOMER = 0,
    START_AS_RESTAURANT = 1,
    START_AS_COURIER = 2,
    START_FREE_MODE = 3
}

export const getHelpMessageContent = (helpMessage: HELP_MESSAGES) => {
    return {
        [HELP_MESSAGES.START_AS_CUSTOMER]: (
            <React.Fragment>
                <h1>Welcome to the demo of BlockFood</h1>
                <p>Play the role of a customer, a restaurant and a courier!</p>
                <p>Look at the bottom of your screen to see what you have to do next.</p>
                <h3>Start right now as a hungry customer!</h3>
            </React.Fragment>
        ),
        [HELP_MESSAGES.START_AS_RESTAURANT]: (
            <React.Fragment>
                <h1>Your order is now created!</h1>
                <p>It's time to become a restaurant in order to accept and prepare this order.</p>
                <h3>Let's go! Chef!</h3>
            </React.Fragment>
        ),
        [HELP_MESSAGES.START_AS_COURIER]: (
            <React.Fragment>
                <h1>Your order is now cooked and ready!</h1>
                <p>You are going to become another player once again: a courier.</p>
                <h3>Don't wait any longer!</h3>
            </React.Fragment>
        ),
        [HELP_MESSAGES.START_FREE_MODE]: (
            <React.Fragment>
                <h1>The demo is finished!</h1>
                <p>You are now free to play each role like you want.</p>
                <h3>Use the buttons in the bottom of your screen to switch.</h3>
            </React.Fragment>
        )
    }[helpMessage]
}