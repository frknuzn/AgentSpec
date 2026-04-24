/**
 * @license
 * Copyright 2025 AgentSpec (agentspec.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { getPlatformServices } from '@/common/platform';

/**
 * Returns baseName unchanged in release builds, or baseName + '-dev' in dev builds.
 * When AGENTSPEC_MULTI_INSTANCE=1, appends '-2' to isolate the second dev instance.
 * Used to isolate symlink and directory names between environments.
 *
 * @example
 * getEnvAwareName('.agentspec')        // release → '.agentspec',        dev → '.agentspec-dev'
 * getEnvAwareName('.agentspec-config') // release → '.agentspec-config', dev → '.agentspec-config-dev'
 * // with AGENTSPEC_MULTI_INSTANCE=1:  dev → '.agentspec-dev-2'
 */
export function getEnvAwareName(baseName: string): string {
  if (getPlatformServices().paths.isPackaged() === true) return baseName;
  const suffix = process.env.AGENTSPEC_MULTI_INSTANCE === '1' ? '-dev-2' : '-dev';
  return `${baseName}${suffix}`;
}
