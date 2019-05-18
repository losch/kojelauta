import {Event} from '../api';

export interface WidgetProps {
  event: Event;
  emit: (message: object) => void;
}
