import './style.scss'
import React from 'react'
import { showModal } from 'components/common/Modal'
import { ContentUtils } from 'braft-utils'

export default class Embed extends React.Component {

  state = {
    toolbarVisible: false,
    playerVisible: false
  }

  shouldComponentUpdate () {
    return !this.state.toolbarVisible
  }

  componentWillUnmount () {
    this.playerModal && this.playerModal.destroy()
  }

  render () {

    const { toolbarVisible, playerVisible } = this.state
    const { mediaData, language } = this.props
    const { src, url, width, height, name } = mediaData

    return (
      <div
        className="braft-media-video-holder"
        onMouseOver={this.showToolbar}
        onMouseLeave={this.hideToolbar}
      >
        <i className="braft-icon-code"></i>
        <h5>{name}</h5>
        <h6>{src || url}</h6>
        {toolbarVisible ? (
          <div
            ref={instance => this.toolbarElement = instance}
            className="braft-embed-video-toolbar"
          >
            <a onClick={this.showPlayer}>&#xe037;</a>
            <a onClick={this.removeEmbed}>&#xe9ac;</a>
          </div>
        ) : null}
      </div>
    )

  }

  showPlayer = () => {

    const { src, url } = this.props.mediaData

    this.playerModal = showModal({
      title: this.props.language.videoPlayer.embedTitle,
      confirmable: true,
      language: this.props.language,
      showCancel: false,
      onClose: this.handlePlayerClose,
      children: <div className="braft-embed-media-player" dangerouslySetInnerHTML={{ __html: src || url}}/>
    })

  }

  removeEmbed = () => {
    this.props.editor.setValue(ContentUtils.removeBlock(this.props.editorState, this.props.block))
  }

  showToolbar = () => {
    this.setState({
      toolbarVisible: true
    })
  }

  hideToolbar = () => {
    this.setState({
      toolbarVisible: false
    })
  }

  handlePlayerClose = () => {
    this.props.editor && this.props.editor.requestFocus()
  }

}