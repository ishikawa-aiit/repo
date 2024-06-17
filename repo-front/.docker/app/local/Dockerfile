FROM node:16

ENV LANG=ja_JP.UTF-8 \
    LC_CTYPE=ja_JP.UTF-8 \
    TZ=Asia/Tokyo

ARG APP=/usr/src/app \
    HOME=/home/node

WORKDIR $APP

COPY --chown=node:node ["./app/local/Droid Sans Mono Nerd Font Complete.otf", "$HOME/.local/share/fonts/"]
COPY --chown=node:node ./app/local/.zshrc $HOME

RUN apt-get update -qq && \
    apt-get install -y git-secrets zsh jq fzf peco vim openssh-client locales locales-all && \
    apt-get remove fonts-vlgothic && \
    apt-get install -y fonts-vlgothic && \
    locale-gen ja_JP.UTF-8 && \
    localedef -f UTF-8 -i ja_JP ja_JP.utf8 && \
    git clone https://github.com/robbyrussell/oh-my-zsh $HOME/.oh-my-zsh && \
    git clone https://github.com/bhilburn/powerlevel9k $HOME/.oh-my-zsh/custom/themes/powerlevel9k && \
    git clone https://github.com/zsh-users/zsh-syntax-highlighting $HOME/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting && \
    git clone https://github.com/zsh-users/zsh-completions $HOME/.oh-my-zsh/custom/plugins/zsh-completions && \
    git clone https://github.com/hlissner/zsh-autopair $HOME/.oh-my-zsh/custom/plugins/zsh-autopair && \
    git clone https://github.com/b4b4r07/emoji-cli $HOME/.oh-my-zsh/custom/plugins/emoji-cli && \
    sh -c "curl https://raw.githubusercontent.com/mrowa44/emojify/master/emojify -o /usr/bin/emojify && chmod +x /usr/bin/emojify" && \
    apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/* && \
    mkdir -p $HOME/.ssh && \
    chown -R node:node $APP $HOME/.ssh

USER node

ENV SHELL /usr/bin/zsh
