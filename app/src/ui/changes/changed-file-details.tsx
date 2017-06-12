import * as React from 'react'
import { PathLabel } from '../lib/path-label'
import { AppFileStatus, mapStatus, iconForStatus } from '../../models/status'
import { IDiff, DiffType } from '../../models/diff'
import { Octicon, OcticonSymbol } from '../octicons'

interface IChangedFileDetailsProps {
  readonly path: string
  readonly oldPath?: string
  readonly status: AppFileStatus
  readonly diff: IDiff
}

const TypeMap = [ 'Document', 'Page', 'Artboard', 'Layer', 'Shape Group', 'Group' ]

/** Displays information about a file */
export class ChangedFileDetails extends React.Component<IChangedFileDetailsProps, void> {
  public render() {

    const status = this.props.status
    const fileStatus = mapStatus(status)

    let metadataElement: JSX.Element | undefined
    let type: string | undefined
    const diff = this.props.diff
    if (diff.kind === DiffType.Text) {
      if (diff.lineEndingsChange) {
        const message = `Warning: line endings have changed from '${diff.lineEndingsChange.from}' to '${diff.lineEndingsChange.to}'.`
        metadataElement = <Octicon symbol={OcticonSymbol.alert}
                            className={'line-endings'}
                            title={message} />
      }
    }

    if (diff.kind === DiffType.Sketch) {
      type = TypeMap[diff.type]
    }

    return (
      <div className='header'>
        <PathLabel
          type={type}
          path={this.props.path}
          oldPath={this.props.oldPath}
          status={this.props.status} />
        { metadataElement }

        <Octicon symbol={iconForStatus(status)}
          className={'status status-' + fileStatus.toLowerCase()}
          title={fileStatus} />
      </div>
    )
  }
}
