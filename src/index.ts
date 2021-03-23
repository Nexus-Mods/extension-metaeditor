
import MetaEditorDialog from './views/MetaEditorDialog';
import MetaEditorIcon from './views/MetaEditorIcon';

import { setShowMetaEditor } from './actions';
import sessionReducer from './reducers';

import * as path from 'path';
import { types } from 'vortex-api';

function main(context: types.IExtensionContext) {
  context.registerReducer(['session', 'metaEditor'], sessionReducer);

  context.registerDialog('meta-editor-dialog', MetaEditorDialog);

  context.registerAction('downloads-action-icons', 100, 'edit', {}, 'View Meta Data',
    (instanceIds: string[]) => {
      context.api.store.dispatch(setShowMetaEditor(instanceIds[0]));
    }, (instanceIds: string[]): boolean => {
      const state: types.IState = context.api.store.getState();
      return state.persistent.downloads.files[instanceIds[0]].state === 'finished';
    });

  context.once(() => {
    context.api.setStylesheet('meta-editor', path.join(__dirname, 'metaeditor.scss'));
  });

  return true;
}

export default main;
