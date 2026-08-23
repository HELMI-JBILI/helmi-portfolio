import { Modal } from './Modal'
import { Button } from './Button'

export function ConfirmDialog({
  open,
  onCancel,
  onConfirm,
  title = 'Delete this item?',
  description = 'This action cannot be undone.',
}: {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
  title?: string
  description?: string
}) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p className="text-sm text-ink-muted">{description}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={onConfirm}
          className="!bg-red-600 hover:!bg-red-700"
        >
          Delete
        </Button>
      </div>
    </Modal>
  )
}
