# To Do

 - [X] edit
   - [X] Fix bug where spacebar scrolls list
   - [X] Fix bug where spacebar in edit modal opens preview and scrolls list
 - [X] batch-edit
   - [X] Fix UI around click/cmd-click/shift-click and selecting multiple rows
         at once. See Note below for details.
 - [X] persist
   - [X] Fix bug where empty fields are updated to blank in the DB
 - [X] sort
 - [ ] filter
 - [ ] break authors and tags into elements in UI
 - [ ] configure library root

## OS X click-in-table behavior:

Click:

 - deselect all, select this one

Cmd-click:

 - if this already selected: deselect
 - else: select this one

Shift-click:

 - if already selected: no-op
 - if any others selected: select all between last click (even if it was a cmd-click deselecting!) and this click
 - else: select this one

Shift-cmd-click:
 - As cmd-click.

Also support typing
