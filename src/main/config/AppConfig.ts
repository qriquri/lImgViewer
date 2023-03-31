import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import defaultConfig from '../../../defaultConfig.json'; // import path はtsファイルから見た相対パスらしい 型定義ファイルもいるよ
const userHome = process.env[
  process.platform == 'win32' ? 'USERPROFILE' : 'HOME'
] as string;
/** */
class Config {
  private defaultConfigData: typeof defaultConfig;
  private configData: typeof defaultConfig;
  private configPath = path.join(
    userHome,
    'Documents',
    app.name,
    'config.json',
  );
  /** */
  constructor() {
    this.defaultConfigData = defaultConfig;
    this.configData = defaultConfig;
  }

  /** */
  loadConfig = () => {
    if (fs.existsSync(this.configPath)) {
      this.configData = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
    }
  };

  /** */
  writeConfig = () => {
    if (!fs.existsSync(path.dirname(this.configPath))) {
      fs.mkdirSync(path.dirname(this.configPath));
    }
    fs.writeFileSync(this.configPath, JSON.stringify(this.configData));
  };

  /**
   *
   * @param {defaultConfig} data
   */
  setConfigData(data: typeof defaultConfig): void {
    this.configData = data;
  }
  /**
   *
   * @return {defaultConfig}
   */
  getConfigData(): typeof defaultConfig {
    return this.configData;
  }

  /**
   *
   * @return {defaultConfig}
   */
  getDefaultConfigData(): typeof defaultConfig {
    return this.defaultConfigData;
  }
}
const AppConfig = new Config();
export default AppConfig; // インスタンスをエクスポートするとグローバル変数をわざわざ作らなくてよくなるし、値の共有も簡単
