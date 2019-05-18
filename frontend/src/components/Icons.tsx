import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHeartbeat,
  faClock,
  faExclamation
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

library.add(
  faHeartbeat,
  faClock,
  faExclamation
);

const HeartbeatIcon = ({...props}) => <FontAwesomeIcon icon={faHeartbeat}
                                                       color="#ee4422"
                                                       {...props} />;

const ClockIcon = ({...props}) => <FontAwesomeIcon icon={faClock}
                                                   color="#666666"
                                                   {...props} />;

const ExcalamationIcon = ({...props}) => <FontAwesomeIcon icon={faExclamation}
                                                          color="#666666"
                                                          {...props} />;

export {
  HeartbeatIcon,
  ClockIcon,
  ExcalamationIcon
}
