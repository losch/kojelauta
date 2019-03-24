import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHeartbeat,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

library.add(
  faHeartbeat,
  faClock
);

const HeartbeatIcon = ({...props}) => <FontAwesomeIcon icon={faHeartbeat}
                                                       color="#ee4422"
                                                       {...props} />;

const ClockIcon = ({...props}) => <FontAwesomeIcon icon={faClock}
                                                   color="#666666"
                                                   {...props} />;

export {
  HeartbeatIcon,
  ClockIcon
}
