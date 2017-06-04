import * as React from 'react'

import { PathText } from '../lib/path-text'
import { Octicon, OcticonSymbol } from '../octicons'
import { showContextualMenu, IMenuItem } from '../main-process-proxy'

interface ISketchFileProps {
  readonly path: string
  readonly id: string
  readonly parsed: boolean
  readonly imported: boolean
  readonly onImport: (path: string) => void
  readonly onParse: (path: string) => void
  readonly onIgnore: (path: string) => void
  readonly onOpen: (path: string) => void
  readonly availableWidth: number
}

/** a changed file in the working directory for a given repository */
export class SketchFile extends React.Component<ISketchFileProps, void> {

  public render() {
    const listItemPadding = 10 * 2
    const checkboxWidth = 20
    const statusWidth = 16
    const filePadding = 5

    const availablePathWidth = this.props.availableWidth - listItemPadding - checkboxWidth - filePadding - statusWidth

    return (
      <div className='file' onContextMenu={this.onContextMenu}>

        <label className='path'><PathText path={this.props.id} availableWidth={availablePathWidth} /></label>

        <Octicon symbol={OcticonSymbol.fold}
                 className={'sketch-file-action' + (this.props.parsed ? ' active' : '')}
                 onClick={() => this.props.parsed && this.props.onImport(this.props.path)}
                 title='Regenerate Sketch File From JSON' />
        <Octicon symbol={OcticonSymbol.unfold}
                 className={'sketch-file-action' + (this.props.imported ? ' active' : '')}
                 onClick={() => this.props.imported && this.props.onParse(this.props.path)}
                 title='Export Sketch To JSON' />
      </div>
    )
  }

  private onContextMenu = (event: React.MouseEvent<any>) => {
    event.preventDefault()

    const items: IMenuItem[] = [
      {
        label: __DARWIN__ ? 'Export Sketch To JSON…' : 'Export to JSON…',
        action: () => this.props.onParse(this.props.path),
        enabled: this.props.imported,
      },
      {
        label: __DARWIN__ ? 'Regenerate Sketch File From JSON…' : 'Regenerate Sketch File From JSON…',
        action: () => this.props.onImport(this.props.path),
        enabled: this.props.parsed,
      },
      { type: 'separator' },
      {
        label: 'Ignore',
        action: () => this.props.onIgnore(this.props.path),
      },
      {
        label: 'Open',
        action: () => this.props.onOpen(this.props.path),
      },
    ]

    showContextualMenu(items)
  }
}
