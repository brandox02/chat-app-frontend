import { Dispatch, useContext } from 'react';
import store from '../../redux';
import deleteChatAction from './../../redux/actions/chatActions/deleteChatAction'
import { IChat } from '../../redux/types/chat';
import { deleteChatsAction } from '../../redux/actions/chatsActions/deleteChatAction';
import { context, paramView, VIEWS } from '../../components/Background/BackgroundReducer';

interface F { chat: IChat, userId: string }

let setView = (arg0: paramView) => { }

const F = () => {
     const c = useContext(context);
     setView = c.setView;
}

function deleteChatListener({ userId, chat }: F) {
     console.log('Se ha recibido delete chat');
     const mySelfUserId = store.getState().user.result._id as string;
     const mySelfChat: IChat = store.getState().chat.result as IChat;

     if (userId !== mySelfUserId) {
          const dispatch: Dispatch<any> = store.dispatch;

          if (mySelfChat._id == chat._id) {
               dispatch(deleteChatAction())
          }
          dispatch(deleteChatsAction(chat._id as string));
          setView(VIEWS.VIEW_LISTA_CHAT.value);
          
     }
}



export default deleteChatListener;