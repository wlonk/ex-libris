# To Do

 - [X] edit
   - [ ] Fix bug where spacebar scrolls list
   - [ ] Fix bug where spacebar in edit modal opens preview and scrolls list
 - [X] batch-edit
   - [ ] Fix UI around click/cmd-click/shift-click and selecting multiple rows
         at once. See Note below for details.
 - [X] persist
 - [ ] sort
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
