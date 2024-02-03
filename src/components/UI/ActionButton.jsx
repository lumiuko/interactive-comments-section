export default function ActionButton({ icon, openedPanels, updatePanel, text, color = '#5357B6', ...props }) {
  function handleClick() {
    const panelName = text.toLowerCase()
    updatePanel(panelName, !openedPanels[panelName])
  }

  return (
    <button className="flex items-center gap-2 hover:opacity-50 transition-opacity" onClick={handleClick} {...props} style={{ color }}>
      <img src={icon} alt="Delete icon" aria-hidden="true" />
      <span>{text}</span>
    </button>
  )
}
