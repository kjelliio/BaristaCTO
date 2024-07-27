import random
from telegram import Update
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext

GAME_STATE = {}

def start(update: Update, context: CallbackContext) -> None:
    update.message.reply_text('Welcome to Number Guessing Game! Type /play to start playing.')

def play(update: Update, context: CallbackContext) -> None:
    chat_id = update.message.chat_id
    number_to_guess = random.randint(1, 100)
    GAME_STATE[chat_id] = number_to_guess
    update.message.reply_text('I have selected a number between 1 and 100. Try to guess it!')

def guess(update: Update, context: CallbackContext) -> None:
    chat_id = update.message.chat_id
    if chat_id in GAME_STATE:
        try:
            user_guess = int(update.message.text)
            number_to_guess = GAME_STATE[chat_id]
            if user_guess < number_to_guess:
                update.message.reply_text('Higher!')
            elif user_guess > number_to_guess:
                update.message.reply_text('Lower!')
            else:
                update.message.reply_text('Congratulations! You guessed it right!')
                del GAME_STATE[chat_id]
        except ValueError:
            update.message.reply_text('Please enter a valid number.')
    else:
        update.message.reply_text('Type /play to start a new game.')

def main():
    updater = Updater("YOUR_BOT_TOKEN", use_context=True)

    dp = updater.dispatcher

    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CommandHandler("play", play))
    dp.add_handler(MessageHandler(Filters.text & ~Filters.command, guess))

    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
