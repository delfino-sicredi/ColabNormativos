import * as React from 'react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import {
    getTheme,
    mergeStyleSets,
    FontWeights,
    Modal,
    IIconProps,

} from '@fluentui/react';
import { IconButton, IButtonStyles } from '@fluentui/react/lib/Button';
export const MYModal = (myprops: any) => {
    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
    const [isPopup, setisPopup] = React.useState(true);
    const titleId = useId('title');
    React.useEffect(() => {
        showModal();
    }, [isPopup]);
    function ExitHandler() {
        hideModal();
        setisPopup(current => !current)
        myprops.handler();
    }

    return (
        <div>
            <Modal
                titleAriaId={titleId}
                isOpen={isModalOpen}
                onDismiss={ExitHandler}
                isBlocking={true}
                containerClassName={contentStyles.container}
            >
                <div className={contentStyles.header}>
                    <span id={titleId}>Modal Popup</span>
                    <IconButton
                        styles={iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        onClick={ExitHandler}
                    />
                </div>
                <div className={contentStyles.body}>
                    <p>
                        Saying “please” and “thank you.” It shows gratitude for the things others do for you.
                        Making introductions. Always introduce yourself to adults who come visit, and introduce friends to each other.
                        Covering your mouth when you sneeze or cough. Germs are gross!
                        Not picking your nose in public. No one wants to see that.
                        Greeting visitors and say goodbye to them. Even if you feel shy, greetings and goodbyes are important.
                        Asking for things instead of reaching for them. It’s disruptive when children reach across the table during mealtimes.
                        Knocking on doors before entering a room. Especially the bathroom door!
                        Responding when an adult asks how you are. It’s even better if you ask her how she is, too.
                        Not interrupting when grownups are talking. Wait for your turn, no matter how impatient you feel.
                        Saying “Excuse me” when you need to interrupt a conversation. Sometimes it’s an emergency, but even so, please be polite.
                        Saying “Excuse me” if you bump into someone. Make sure they know you didn’t do it on purpose.
                        Not using electronics at the dinner table. Show others that their presence is important to you.
                        Sitting attentively through plays, movies, and musical performances. Show proper respect, even if you’re bored.
                        Washing your hands before meals. It’s good etiquette and good hygiene too.
                        Not commenting on personal appearance. It hurts feelings unnecessarily.
                        Holding doors open for others. No one likes to have the door slam on them as they enter a room.
                        Keeping burps silent. And remember to say “Excuse me” afterward.
                        Offering to help adults if they need it. Help wash someone’s car or carry their groceries.
                        Giving a genuine apology when needed. Sometimes, the other person needs to hear you say, “I’m sorry.”
                        Asking to be excused at the end of a meal. Instead of just getting up to leave, say, “Please may I be excused?”
                        Using good table manners when eating. Use utensils properly and chew with your mouth closed.
                        Having a positive attitude. You will be someone that people enjoy having around.
                        Shaking hands. A firm handshake makes a good impression when you meet someone.
                        Returning items after borrowing them. Show respect for other people’s belongings.
                        Avoiding bad language. The words you use reveal your character.
                        Sharing. It’s a basic way to show consideration for the needs and feelings of others.
                        Giving compliments. Everyone likes to hear nice things about themselves.
                        Doing tasks for adults without complaining. Don’t make their lives more complicated by arguing.
                        Writing thank-you notes when you receive gifts. Technology is great, but sometimes people need a more personal touch.
                        Doing for others what you want them to do for you. If you remember this rule, it’s easier to follow all the others.
                    </p>
                </div>
            </Modal>

        </div>

    );
};

const cancelIcon: IIconProps = { iconName: 'Cancel' };

const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
    },
    header: [
        // eslint-disable-next-line deprecation/deprecation
        theme.fonts.xLarge,
        {
            flex: '1 1 auto',
            borderTop: '4px solid ${theme.palette.themePrimary}',
            color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '12px 12px 14px 24px',
        },
    ],
    body: {
        flex: '4 4 auto',
        padding: '0 24px 24px 24px',
        overflowY: 'hidden',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
    },
});

const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: theme.palette.neutralPrimary,
        marginLeft: 'auto',
        marginTop: '4px',
        marginRight: '2px',
    },
    rootHovered: {
        color: theme.palette.neutralDark,
    },
};